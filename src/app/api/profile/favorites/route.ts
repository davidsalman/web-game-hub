import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

type ProfileFavoritesRow = {
  favorite_games: string[] | null;
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

async function getOrCreateFavorites(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> },
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("favorite_games")
    .eq("user_id", user.id)
    .single<ProfileFavoritesRow>();

  if (!error && data) {
    return data.favorite_games ?? [];
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

  return [];
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

export async function GET(request: Request) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const gameId = url.searchParams.get("gameId");
  const gameSlug = url.searchParams.get("gameSlug");

  try {
    const favoriteGames = await getOrCreateFavorites(supabase, user);
    let resolvedGameId = gameId;

    if (!resolvedGameId && gameSlug) {
      resolvedGameId = await resolveGameId(supabase, gameSlug);
    }

    const isFavorite = resolvedGameId
      ? favoriteGames.includes(resolvedGameId)
      : false;
    return NextResponse.json({ favoriteGames, isFavorite });
  } catch {
    return NextResponse.json(
      { error: "Failed to load favorites" },
      { status: 500 },
    );
  }
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

  if (!resolvedGameId) {
    return NextResponse.json(
      { error: "A valid gameId or gameSlug is required" },
      { status: 400 },
    );
  }

  try {
    const favoriteGames = await getOrCreateFavorites(supabase, user);
    const alreadyFavorite = favoriteGames.includes(resolvedGameId);

    const nextFavoriteGames = alreadyFavorite
      ? favoriteGames.filter((id) => id !== resolvedGameId)
      : [...favoriteGames, resolvedGameId];

    const { data: updated, error: updateError } = await supabase
      .from("profiles")
      .update({ favorite_games: nextFavoriteGames })
      .eq("user_id", user.id)
      .select("favorite_games")
      .single<ProfileFavoritesRow>();

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update favorites" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      favoriteGames: updated.favorite_games ?? [],
      isFavorite: !alreadyFavorite,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update favorites" },
      { status: 500 },
    );
  }
}
