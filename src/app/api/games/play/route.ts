import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

type ProfilePlaysRow = {
  total_plays: number | null;
};

type GameIdRow = {
  id: string;
};

function getUsername(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const metadata = user.user_metadata ?? {};
  const username =
    typeof metadata.username === "string" ? metadata.username : undefined;
  const fullName =
    typeof metadata.full_name === "string" ? metadata.full_name : undefined;
  return username ?? fullName ?? user.email?.split("@")[0] ?? "Player";
}

async function getOrCreateTotalPlays(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> },
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("total_plays")
    .eq("user_id", user.id)
    .single<ProfilePlaysRow>();

  if (!error && data) {
    return data.total_plays ?? 0;
  }

  const { error: insertError } = await supabase.from("profiles").insert({
    user_id: user.id,
    username: getUsername(user),
    favorite_games: [],
    total_plays: 0,
  });

  if (insertError) {
    throw insertError;
  }

  return 0;
}

async function resolveGameId(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  gameSlug: string,
) {
  const { data, error } = await supabase
    .from("games")
    .select("id")
    .eq("slug", gameSlug)
    .single<GameIdRow>();

  if (error || !data?.id) {
    return null;
  }

  return data.id;
}

export async function POST(request: Request) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    gameId?: unknown;
    gameSlug?: unknown;
  } | null;
  const gameId = typeof body?.gameId === "string" ? body.gameId : "";
  const gameSlug = typeof body?.gameSlug === "string" ? body.gameSlug : "";
  const resolvedGameId =
    gameId || (gameSlug ? await resolveGameId(supabase, gameSlug) : null);

  if (!gameId && !gameSlug) {
    return NextResponse.json(
      { error: "gameId or gameSlug is required" },
      { status: 400 },
    );
  }

  try {
    const currentTotalPlays = await getOrCreateTotalPlays(supabase, user);
    const nextTotalPlays = currentTotalPlays + 1;

    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({ total_plays: nextTotalPlays })
      .eq("user_id", user.id)
      .select("total_plays")
      .single<ProfilePlaysRow>();

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to update total plays" },
        { status: 500 },
      );
    }

    if (resolvedGameId) {
      await supabase.from("play_history").insert({
        user_id: user.id,
        game_id: resolvedGameId,
      });
    }

    return NextResponse.json({
      totalPlays: updatedProfile.total_plays ?? nextTotalPlays,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to track play" },
      { status: 500 },
    );
  }
}
