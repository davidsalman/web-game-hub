"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

interface FavoriteGameButtonProps {
  gameSlug: string;
}

export default function FavoriteGameButton({
  gameSlug,
}: FavoriteGameButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadFavoriteState() {
      try {
        const response = await fetch(
          `/api/profile/favorites?gameSlug=${encodeURIComponent(gameSlug)}`,
        );

        if (response.status === 401) {
          if (!active) return;
          setIsSignedIn(false);
          setIsFavorite(false);
          return;
        }

        if (!response.ok) return;

        const result = (await response.json()) as { isFavorite?: boolean };
        if (!active) return;

        setIsFavorite(Boolean(result.isFavorite));
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadFavoriteState();

    return () => {
      active = false;
    };
  }, [gameSlug]);

  const handleToggleFavorite = async () => {
    if (!isSignedIn || isSaving) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/profile/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameSlug }),
      });

      if (!response.ok) return;

      const result = (await response.json()) as { isFavorite?: boolean };
      setIsFavorite(Boolean(result.isFavorite));
    } finally {
      setIsSaving(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Link
        href="/auth/signin"
        className="shrink-0 flex items-center gap-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
      >
        <Heart size={16} /> Favorite
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={isLoading || isSaving}
      className={`shrink-0 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
        isFavorite
          ? "bg-pink-600/20 text-pink-300 border border-pink-500/40 hover:bg-pink-600/30"
          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
      } ${isLoading || isSaving ? "opacity-60 cursor-not-allowed" : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={16}
        className={isFavorite ? "fill-pink-400 text-pink-400" : ""}
      />
      {isFavorite ? "Favorited" : "Favorite"}
    </button>
  );
}
