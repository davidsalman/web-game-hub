import type { Category, Game } from '@/types'
import { createStaticClient } from './supabase'

export const STATIC_CATEGORIES: Category[] = [
  { id: 'cat-action', name: 'Action', slug: 'action', description: 'Fast-paced action games that test your reflexes and skills.', icon: '⚡', color: 'from-red-600 to-orange-500', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-adventure', name: 'Adventure', slug: 'adventure', description: 'Explore vast worlds and embark on epic quests.', icon: '🗺️', color: 'from-green-600 to-teal-500', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-puzzle', name: 'Puzzle', slug: 'puzzle', description: 'Challenge your mind with brain-teasing puzzles.', icon: '🧩', color: 'from-blue-600 to-indigo-500', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-racing', name: 'Racing', slug: 'racing', description: 'Feel the speed in thrilling racing games.', icon: '🏎️', color: 'from-yellow-500 to-orange-400', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-sports', name: 'Sports', slug: 'sports', description: 'Compete in your favorite sports games online.', icon: '⚽', color: 'from-emerald-600 to-green-400', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-strategy', name: 'Strategy', slug: 'strategy', description: 'Plan and conquer in deep strategy games.', icon: '♟️', color: 'from-purple-600 to-violet-500', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-arcade', name: 'Arcade', slug: 'arcade', description: 'Classic and modern arcade-style games.', icon: '🕹️', color: 'from-pink-600 to-rose-400', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-multiplayer', name: 'Multiplayer', slug: 'multiplayer', description: 'Play with friends in real-time multiplayer games.', icon: '👥', color: 'from-cyan-600 to-blue-400', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-shooting', name: 'Shooting', slug: 'shooting', description: 'Sharpen your aim in intense shooting games.', icon: '🎯', color: 'from-gray-600 to-slate-500', created_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-platformer', name: 'Platformer', slug: 'platformer', description: 'Jump and run through exciting platform levels.', icon: '🏃', color: 'from-amber-600 to-yellow-400', created_at: '2024-01-01T00:00:00Z' },
]

export const STATIC_GAMES: Game[] = [
  // Action (5)
  { id: 'g-001', name: 'Cyber Warrior', slug: 'cyber-warrior', description: 'Battle through a neon-lit cyberpunk city as an elite warrior. Fight waves of enemies with your arsenal of futuristic weapons.', category_id: 'cat-action', thumbnail_url: 'https://picsum.photos/seed/cyberwarrior/400/300', game_url: 'https://www.gameflare.com/embed/cyber-warrior/', is_featured: true, play_count: 125430, rating: 4.7, tags: ['action', 'cyberpunk', 'fighting'], created_at: '2024-01-01T00:00:00Z' },
  { id: 'g-002', name: 'Shadow Strike', slug: 'shadow-strike', description: 'A stealth action game where you eliminate targets from the shadows using cunning and precision.', category_id: 'cat-action', thumbnail_url: 'https://picsum.photos/seed/shadowstrike/400/300', game_url: 'https://www.gameflare.com/embed/shadow-strike/', is_featured: false, play_count: 98210, rating: 4.5, tags: ['action', 'stealth', 'ninja'], created_at: '2024-01-02T00:00:00Z' },
  { id: 'g-003', name: 'Blaze Runner', slug: 'blaze-runner', description: 'An intense action platformer with explosive combat mechanics and spectacular boss battles.', category_id: 'cat-action', thumbnail_url: 'https://picsum.photos/seed/blazerunner/400/300', game_url: 'https://www.gameflare.com/embed/blaze-runner/', is_featured: false, play_count: 76540, rating: 4.3, tags: ['action', 'platformer', 'boss-fights'], created_at: '2024-01-03T00:00:00Z' },
  { id: 'g-004', name: 'Iron Fist', slug: 'iron-fist', description: 'Master martial arts techniques to defeat opponents in this epic fighting game with fluid combo system.', category_id: 'cat-action', thumbnail_url: 'https://picsum.photos/seed/ironfist/400/300', game_url: 'https://www.gameflare.com/embed/iron-fist/', is_featured: true, play_count: 143250, rating: 4.8, tags: ['action', 'fighting', 'martial-arts'], created_at: '2024-01-04T00:00:00Z' },
  { id: 'g-005', name: 'Storm Raider', slug: 'storm-raider', description: 'Ride through thunderstorms as a lightning-powered hero battling supernatural foes.', category_id: 'cat-action', thumbnail_url: 'https://picsum.photos/seed/stormraider/400/300', game_url: 'https://www.gameflare.com/embed/storm-raider/', is_featured: false, play_count: 54320, rating: 4.2, tags: ['action', 'superhero', 'storm'], created_at: '2024-01-05T00:00:00Z' },

  // Adventure (5)
  { id: 'g-006', name: 'Lost Kingdom', slug: 'lost-kingdom', description: 'Discover the secrets of a forgotten kingdom in this sprawling adventure game with rich lore and exploration.', category_id: 'cat-adventure', thumbnail_url: 'https://picsum.photos/seed/lostkingdom/400/300', game_url: 'https://www.gameflare.com/embed/lost-kingdom/', is_featured: true, play_count: 187320, rating: 4.9, tags: ['adventure', 'rpg', 'exploration'], created_at: '2024-01-06T00:00:00Z' },
  { id: 'g-007', name: 'Forest Quest', slug: 'forest-quest', description: 'Navigate through an enchanted forest filled with magical creatures and hidden treasures.', category_id: 'cat-adventure', thumbnail_url: 'https://picsum.photos/seed/forestquest/400/300', game_url: 'https://www.gameflare.com/embed/forest-quest/', is_featured: false, play_count: 65430, rating: 4.4, tags: ['adventure', 'fantasy', 'forest'], created_at: '2024-01-07T00:00:00Z' },
  { id: 'g-008', name: 'Ancient Ruins', slug: 'ancient-ruins', description: 'Explore ancient temples and solve archaeological puzzles to uncover lost civilizations.', category_id: 'cat-adventure', thumbnail_url: 'https://picsum.photos/seed/ancientruins/400/300', game_url: 'https://www.gameflare.com/embed/ancient-ruins/', is_featured: false, play_count: 89760, rating: 4.6, tags: ['adventure', 'archaeology', 'puzzle'], created_at: '2024-01-08T00:00:00Z' },
  { id: 'g-009', name: "Dragon's Path", slug: 'dragons-path', description: 'Follow a young dragon on a coming-of-age adventure through a world of magic and danger.', category_id: 'cat-adventure', thumbnail_url: "https://picsum.photos/seed/dragonspath/400/300", game_url: "https://www.gameflare.com/embed/dragons-path/", is_featured: true, play_count: 234510, rating: 4.9, tags: ['adventure', 'dragon', 'fantasy'], created_at: '2024-01-09T00:00:00Z' },
  { id: 'g-010', name: 'Mystic Journey', slug: 'mystic-journey', description: 'A point-and-click adventure through mystical realms, solving riddles and meeting mythical beings.', category_id: 'cat-adventure', thumbnail_url: 'https://picsum.photos/seed/mysticjourney/400/300', game_url: 'https://www.gameflare.com/embed/mystic-journey/', is_featured: false, play_count: 47890, rating: 4.3, tags: ['adventure', 'point-and-click', 'mystical'], created_at: '2024-01-10T00:00:00Z' },

  // Puzzle (5)
  { id: 'g-011', name: 'Block Master', slug: 'block-master', description: 'The ultimate block puzzle game. Arrange falling blocks to clear lines and achieve high scores.', category_id: 'cat-puzzle', thumbnail_url: 'https://picsum.photos/seed/blockmaster/400/300', game_url: 'https://www.gameflare.com/embed/block-master/', is_featured: false, play_count: 312450, rating: 4.7, tags: ['puzzle', 'blocks', 'classic'], created_at: '2024-01-11T00:00:00Z' },
  { id: 'g-012', name: 'Mind Maze', slug: 'mind-maze', description: 'Navigate through increasingly complex mazes using logic and spatial reasoning skills.', category_id: 'cat-puzzle', thumbnail_url: 'https://picsum.photos/seed/mindmaze/400/300', game_url: 'https://www.gameflare.com/embed/mind-maze/', is_featured: true, play_count: 156780, rating: 4.6, tags: ['puzzle', 'maze', 'logic'], created_at: '2024-01-12T00:00:00Z' },
  { id: 'g-013', name: 'Color Sort', slug: 'color-sort', description: 'Sort colored balls into matching tubes in this satisfying and addictive puzzle game.', category_id: 'cat-puzzle', thumbnail_url: 'https://picsum.photos/seed/colorsort/400/300', game_url: 'https://www.gameflare.com/embed/color-sort/', is_featured: false, play_count: 432100, rating: 4.8, tags: ['puzzle', 'colors', 'sorting'], created_at: '2024-01-13T00:00:00Z' },
  { id: 'g-014', name: 'Number Crunch', slug: 'number-crunch', description: 'Match numbers and perform calculations to solve increasingly challenging numerical puzzles.', category_id: 'cat-puzzle', thumbnail_url: 'https://picsum.photos/seed/numbercrunch/400/300', game_url: 'https://www.gameflare.com/embed/number-crunch/', is_featured: false, play_count: 87650, rating: 4.2, tags: ['puzzle', 'numbers', 'math'], created_at: '2024-01-14T00:00:00Z' },
  { id: 'g-015', name: 'Word Flow', slug: 'word-flow', description: 'Connect letters to form words in this flowing, relaxing word puzzle experience.', category_id: 'cat-puzzle', thumbnail_url: 'https://picsum.photos/seed/wordflow/400/300', game_url: 'https://www.gameflare.com/embed/word-flow/', is_featured: false, play_count: 198430, rating: 4.5, tags: ['puzzle', 'words', 'casual'], created_at: '2024-01-15T00:00:00Z' },

  // Racing (5)
  { id: 'g-016', name: 'Speed Demon', slug: 'speed-demon', description: 'Push the limits of speed on treacherous tracks in this high-octane racing game.', category_id: 'cat-racing', thumbnail_url: 'https://picsum.photos/seed/speeddemon/400/300', game_url: 'https://www.gameflare.com/embed/speed-demon/', is_featured: true, play_count: 276890, rating: 4.8, tags: ['racing', 'speed', 'cars'], created_at: '2024-01-16T00:00:00Z' },
  { id: 'g-017', name: 'Track Blazer', slug: 'track-blazer', description: 'Race on dynamically generated tracks with upgradeable vehicles and competitive AI.', category_id: 'cat-racing', thumbnail_url: 'https://picsum.photos/seed/trackblazer/400/300', game_url: 'https://www.gameflare.com/embed/track-blazer/', is_featured: false, play_count: 145230, rating: 4.5, tags: ['racing', 'tracks', 'upgrades'], created_at: '2024-01-17T00:00:00Z' },
  { id: 'g-018', name: 'Drift King', slug: 'drift-king', description: 'Master the art of drifting through tight corners on iconic street racing circuits.', category_id: 'cat-racing', thumbnail_url: 'https://picsum.photos/seed/driftking/400/300', game_url: 'https://www.gameflare.com/embed/drift-king/', is_featured: false, play_count: 98430, rating: 4.4, tags: ['racing', 'drift', 'street'], created_at: '2024-01-18T00:00:00Z' },
  { id: 'g-019', name: 'Neon Racer', slug: 'neon-racer', description: 'Race through a retro-futuristic neon world at lightning speeds with gravity-defying tracks.', category_id: 'cat-racing', thumbnail_url: 'https://picsum.photos/seed/neonracer/400/300', game_url: 'https://www.gameflare.com/embed/neon-racer/', is_featured: true, play_count: 312780, rating: 4.9, tags: ['racing', 'neon', 'futuristic'], created_at: '2024-01-19T00:00:00Z' },
  { id: 'g-020', name: 'Desert Storm Race', slug: 'desert-storm-race', description: 'Off-road racing through desert dunes, rocky canyons, and sandstorm conditions.', category_id: 'cat-racing', thumbnail_url: 'https://picsum.photos/seed/desertstorm/400/300', game_url: 'https://www.gameflare.com/embed/desert-storm-race/', is_featured: false, play_count: 67890, rating: 4.3, tags: ['racing', 'offroad', 'desert'], created_at: '2024-01-20T00:00:00Z' },

  // Sports (5)
  { id: 'g-021', name: 'Soccer Stars', slug: 'soccer-stars', description: 'Manage and play with your dream soccer team in this action-packed football game.', category_id: 'cat-sports', thumbnail_url: 'https://picsum.photos/seed/soccerstars/400/300', game_url: 'https://www.gameflare.com/embed/soccer-stars/', is_featured: true, play_count: 423670, rating: 4.8, tags: ['sports', 'soccer', 'football'], created_at: '2024-01-21T00:00:00Z' },
  { id: 'g-022', name: 'Basketball Slam', slug: 'basketball-slam', description: 'Show off your dunking skills and three-point shooting in this fast-paced basketball game.', category_id: 'cat-sports', thumbnail_url: 'https://picsum.photos/seed/basketballslam/400/300', game_url: 'https://www.gameflare.com/embed/basketball-slam/', is_featured: false, play_count: 187540, rating: 4.6, tags: ['sports', 'basketball', 'slam-dunk'], created_at: '2024-01-22T00:00:00Z' },
  { id: 'g-023', name: 'Tennis Pro', slug: 'tennis-pro', description: 'Experience the thrill of professional tennis with realistic physics and tournament play.', category_id: 'cat-sports', thumbnail_url: 'https://picsum.photos/seed/tennispro/400/300', game_url: 'https://www.gameflare.com/embed/tennis-pro/', is_featured: false, play_count: 98760, rating: 4.4, tags: ['sports', 'tennis', 'tournament'], created_at: '2024-01-23T00:00:00Z' },
  { id: 'g-024', name: 'Golf Master', slug: 'golf-master', description: 'Play through beautifully designed golf courses with realistic wind and terrain physics.', category_id: 'cat-sports', thumbnail_url: 'https://picsum.photos/seed/golfmaster/400/300', game_url: 'https://www.gameflare.com/embed/golf-master/', is_featured: false, play_count: 76540, rating: 4.3, tags: ['sports', 'golf', 'simulation'], created_at: '2024-01-24T00:00:00Z' },
  { id: 'g-025', name: 'Volleyball Beach', slug: 'volleyball-beach', description: 'Spike and block your way to victory in this sun-soaked beach volleyball game.', category_id: 'cat-sports', thumbnail_url: 'https://picsum.photos/seed/volleyballbeach/400/300', game_url: 'https://www.gameflare.com/embed/volleyball-beach/', is_featured: false, play_count: 65430, rating: 4.2, tags: ['sports', 'volleyball', 'beach'], created_at: '2024-01-25T00:00:00Z' },

  // Strategy (5)
  { id: 'g-026', name: 'Empire Builder', slug: 'empire-builder', description: 'Build and expand your empire from a small village to a mighty civilization across ages.', category_id: 'cat-strategy', thumbnail_url: 'https://picsum.photos/seed/empirebuilder/400/300', game_url: 'https://www.gameflare.com/embed/empire-builder/', is_featured: true, play_count: 234560, rating: 4.8, tags: ['strategy', 'building', 'empire'], created_at: '2024-01-26T00:00:00Z' },
  { id: 'g-027', name: 'Tower Defense Pro', slug: 'tower-defense-pro', description: 'Strategically place towers to defend your base against endless waves of enemies.', category_id: 'cat-strategy', thumbnail_url: 'https://picsum.photos/seed/towerdefense/400/300', game_url: 'https://www.gameflare.com/embed/tower-defense-pro/', is_featured: false, play_count: 189430, rating: 4.7, tags: ['strategy', 'tower-defense', 'waves'], created_at: '2024-01-27T00:00:00Z' },
  { id: 'g-028', name: 'War Commander', slug: 'war-commander', description: 'Command armies on the battlefield using tactical maneuvers to defeat the enemy forces.', category_id: 'cat-strategy', thumbnail_url: 'https://picsum.photos/seed/warcommander/400/300', game_url: 'https://www.gameflare.com/embed/war-commander/', is_featured: false, play_count: 145670, rating: 4.6, tags: ['strategy', 'war', 'tactics'], created_at: '2024-01-28T00:00:00Z' },
  { id: 'g-029', name: 'City Planner', slug: 'city-planner', description: 'Design and manage a thriving metropolis, balancing resources and citizen happiness.', category_id: 'cat-strategy', thumbnail_url: 'https://picsum.photos/seed/cityplanner/400/300', game_url: 'https://www.gameflare.com/embed/city-planner/', is_featured: false, play_count: 98760, rating: 4.5, tags: ['strategy', 'city-building', 'simulation'], created_at: '2024-01-29T00:00:00Z' },
  { id: 'g-030', name: 'Kingdom Rise', slug: 'kingdom-rise', description: 'Rise from a peasant to king by building alliances and conquering rival kingdoms.', category_id: 'cat-strategy', thumbnail_url: 'https://picsum.photos/seed/kingdomrise/400/300', game_url: 'https://www.gameflare.com/embed/kingdom-rise/', is_featured: true, play_count: 276540, rating: 4.9, tags: ['strategy', 'kingdom', 'medieval'], created_at: '2024-01-30T00:00:00Z' },

  // Arcade (5)
  { id: 'g-031', name: 'Pixel Shooter', slug: 'pixel-shooter', description: 'A retro-style pixel art shoot-em-up with colorful sprites and chiptune soundtrack.', category_id: 'cat-arcade', thumbnail_url: 'https://picsum.photos/seed/pixelshooter/400/300', game_url: 'https://www.gameflare.com/embed/pixel-shooter/', is_featured: false, play_count: 287650, rating: 4.7, tags: ['arcade', 'pixel', 'shooter'], created_at: '2024-02-01T00:00:00Z' },
  { id: 'g-032', name: 'Bubble Pop', slug: 'bubble-pop', description: 'Pop matching bubbles to clear the board in this classic and satisfying arcade game.', category_id: 'cat-arcade', thumbnail_url: 'https://picsum.photos/seed/bubblepop/400/300', game_url: 'https://www.gameflare.com/embed/bubble-pop/', is_featured: false, play_count: 456780, rating: 4.8, tags: ['arcade', 'bubbles', 'casual'], created_at: '2024-02-02T00:00:00Z' },
  { id: 'g-033', name: 'Coin Rush', slug: 'coin-rush', description: 'Sprint through obstacle courses collecting coins while avoiding traps in this fast arcade game.', category_id: 'cat-arcade', thumbnail_url: 'https://picsum.photos/seed/coinrush/400/300', game_url: 'https://www.gameflare.com/embed/coin-rush/', is_featured: true, play_count: 345670, rating: 4.6, tags: ['arcade', 'runner', 'coins'], created_at: '2024-02-03T00:00:00Z' },
  { id: 'g-034', name: 'Gem Blast', slug: 'gem-blast', description: 'Match and blast colorful gems in this explosive match-3 arcade puzzle experience.', category_id: 'cat-arcade', thumbnail_url: 'https://picsum.photos/seed/gemblast/400/300', game_url: 'https://www.gameflare.com/embed/gem-blast/', is_featured: false, play_count: 234560, rating: 4.5, tags: ['arcade', 'match-3', 'gems'], created_at: '2024-02-04T00:00:00Z' },
  { id: 'g-035', name: 'Space Invader X', slug: 'space-invader-x', description: 'A modern twist on the classic space invaders with power-ups, boss levels, and online leaderboards.', category_id: 'cat-arcade', thumbnail_url: 'https://picsum.photos/seed/spaceinvader/400/300', game_url: 'https://www.gameflare.com/embed/space-invader-x/', is_featured: true, play_count: 398760, rating: 4.9, tags: ['arcade', 'space', 'classic'], created_at: '2024-02-05T00:00:00Z' },

  // Multiplayer (5)
  { id: 'g-036', name: 'Battle Arena', slug: 'battle-arena', description: 'Enter the battle arena and fight other players in real-time with diverse character abilities.', category_id: 'cat-multiplayer', thumbnail_url: 'https://picsum.photos/seed/battlearena/400/300', game_url: 'https://www.gameflare.com/embed/battle-arena/', is_featured: true, play_count: 567890, rating: 4.9, tags: ['multiplayer', 'battle', 'arena'], created_at: '2024-02-06T00:00:00Z' },
  { id: 'g-037', name: 'Team Fortress Online', slug: 'team-fortress-online', description: 'Work with your team to capture objectives and defeat the opposing team in class-based combat.', category_id: 'cat-multiplayer', thumbnail_url: 'https://picsum.photos/seed/teamfortress/400/300', game_url: 'https://www.gameflare.com/embed/team-fortress-online/', is_featured: false, play_count: 345670, rating: 4.7, tags: ['multiplayer', 'team', 'FPS'], created_at: '2024-02-07T00:00:00Z' },
  { id: 'g-038', name: 'Zombie Survival', slug: 'zombie-survival', description: 'Survive the zombie apocalypse alongside other players in this co-op survival horror game.', category_id: 'cat-multiplayer', thumbnail_url: 'https://picsum.photos/seed/zombiesurvival/400/300', game_url: 'https://www.gameflare.com/embed/zombie-survival/', is_featured: false, play_count: 234560, rating: 4.6, tags: ['multiplayer', 'zombie', 'survival'], created_at: '2024-02-08T00:00:00Z' },
  { id: 'g-039', name: 'Space Conquest', slug: 'space-conquest', description: 'Compete with players worldwide to conquer galaxies and build the most powerful space empire.', category_id: 'cat-multiplayer', thumbnail_url: 'https://picsum.photos/seed/spaceconquest/400/300', game_url: 'https://www.gameflare.com/embed/space-conquest/', is_featured: false, play_count: 178900, rating: 4.5, tags: ['multiplayer', 'space', 'strategy'], created_at: '2024-02-09T00:00:00Z' },
  { id: 'g-040', name: 'Dungeon Party', slug: 'dungeon-party', description: 'Explore dangerous dungeons with up to 4 friends, defeating monsters and sharing epic loot.', category_id: 'cat-multiplayer', thumbnail_url: 'https://picsum.photos/seed/dungeonparty/400/300', game_url: 'https://www.gameflare.com/embed/dungeon-party/', is_featured: true, play_count: 289760, rating: 4.8, tags: ['multiplayer', 'dungeon', 'co-op'], created_at: '2024-02-10T00:00:00Z' },

  // Shooting (5)
  { id: 'g-041', name: 'Sniper Elite', slug: 'sniper-elite', description: 'Take down targets with precision from long range in this realistic sniper simulation game.', category_id: 'cat-shooting', thumbnail_url: 'https://picsum.photos/seed/sniperelite/400/300', game_url: 'https://www.gameflare.com/embed/sniper-elite/', is_featured: true, play_count: 345670, rating: 4.8, tags: ['shooting', 'sniper', 'precision'], created_at: '2024-02-11T00:00:00Z' },
  { id: 'g-042', name: 'Gunner Pro', slug: 'gunner-pro', description: 'Defend your position against waves of enemies using a huge arsenal of upgradeable guns.', category_id: 'cat-shooting', thumbnail_url: 'https://picsum.photos/seed/gunnerpro/400/300', game_url: 'https://www.gameflare.com/embed/gunner-pro/', is_featured: false, play_count: 198760, rating: 4.6, tags: ['shooting', 'defense', 'upgrades'], created_at: '2024-02-12T00:00:00Z' },
  { id: 'g-043', name: 'Target Practice', slug: 'target-practice', description: 'Test your shooting accuracy across different scenarios and weapon types in this training game.', category_id: 'cat-shooting', thumbnail_url: 'https://picsum.photos/seed/targetpractice/400/300', game_url: 'https://www.gameflare.com/embed/target-practice/', is_featured: false, play_count: 156780, rating: 4.4, tags: ['shooting', 'accuracy', 'training'], created_at: '2024-02-13T00:00:00Z' },
  { id: 'g-044', name: 'Bullet Storm', slug: 'bullet-storm', description: 'Survive endless bullet hell waves in this intense top-down shooter with screen-filling attacks.', category_id: 'cat-shooting', thumbnail_url: 'https://picsum.photos/seed/bulletstorm/400/300', game_url: 'https://www.gameflare.com/embed/bullet-storm/', is_featured: false, play_count: 276540, rating: 4.7, tags: ['shooting', 'bullet-hell', 'top-down'], created_at: '2024-02-14T00:00:00Z' },
  { id: 'g-045', name: 'Night Ops', slug: 'night-ops', description: 'Complete covert night operations with tactical shooting and stealth mechanics.', category_id: 'cat-shooting', thumbnail_url: 'https://picsum.photos/seed/nightops/400/300', game_url: 'https://www.gameflare.com/embed/night-ops/', is_featured: false, play_count: 134560, rating: 4.5, tags: ['shooting', 'tactical', 'stealth'], created_at: '2024-02-15T00:00:00Z' },

  // Platformer (5)
  { id: 'g-046', name: 'Jump Hero', slug: 'jump-hero', description: 'Leap through colorful levels as a nimble hero, collecting stars and defeating quirky enemies.', category_id: 'cat-platformer', thumbnail_url: 'https://picsum.photos/seed/jumphero/400/300', game_url: 'https://www.gameflare.com/embed/jump-hero/', is_featured: true, play_count: 456780, rating: 4.9, tags: ['platformer', 'jumping', 'colorful'], created_at: '2024-02-16T00:00:00Z' },
  { id: 'g-047', name: 'Platform Runner', slug: 'platform-runner', description: 'Run and jump through procedurally generated platform levels with increasing difficulty.', category_id: 'cat-platformer', thumbnail_url: 'https://picsum.photos/seed/platformrunner/400/300', game_url: 'https://www.gameflare.com/embed/platform-runner/', is_featured: false, play_count: 234560, rating: 4.6, tags: ['platformer', 'runner', 'procedural'], created_at: '2024-02-17T00:00:00Z' },
  { id: 'g-048', name: 'Sky Walker', slug: 'sky-walker', description: 'Walk through the clouds on precarious platforms high above the ground in this vertigo-inducing game.', category_id: 'cat-platformer', thumbnail_url: 'https://picsum.photos/seed/skywalker/400/300', game_url: 'https://www.gameflare.com/embed/sky-walker/', is_featured: false, play_count: 178900, rating: 4.5, tags: ['platformer', 'sky', 'vertical'], created_at: '2024-02-18T00:00:00Z' },
  { id: 'g-049', name: 'Cave Explorer', slug: 'cave-explorer', description: 'Delve into dark underground caves, collecting gems and avoiding cave-dwelling monsters.', category_id: 'cat-platformer', thumbnail_url: 'https://picsum.photos/seed/caveexplorer/400/300', game_url: 'https://www.gameflare.com/embed/cave-explorer/', is_featured: false, play_count: 145670, rating: 4.4, tags: ['platformer', 'cave', 'exploration'], created_at: '2024-02-19T00:00:00Z' },
  { id: 'g-050', name: 'Neon Platformer', slug: 'neon-platformer', description: 'A stylish neon platformer with wall-running, dash moves, and a pumping electronic soundtrack.', category_id: 'cat-platformer', thumbnail_url: 'https://picsum.photos/seed/neonplatformer/400/300', game_url: 'https://www.gameflare.com/embed/neon-platformer/', is_featured: true, play_count: 312780, rating: 4.8, tags: ['platformer', 'neon', 'parkour'], created_at: '2024-02-20T00:00:00Z' },
]

export async function getCategories(): Promise<Category[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url') {
    return STATIC_CATEGORIES
  }
  try {
    const supabase = createStaticClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    if (error || !data?.length) return STATIC_CATEGORIES
    return data as Category[]
  } catch {
    return STATIC_CATEGORIES
  }
}

export async function getGames(): Promise<Game[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url') {
    return STATIC_GAMES
  }
  try {
    const supabase = createStaticClient()
    const { data, error } = await supabase
      .from('games')
      .select('*, category:categories(*)')
      .order('play_count', { ascending: false })
    if (error || !data?.length) return STATIC_GAMES
    return data as Game[]
  } catch {
    return STATIC_GAMES
  }
}

export async function getFeaturedGames(): Promise<Game[]> {
  const games = await getGames()
  return games.filter(g => g.is_featured)
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const games = await getGames()
  const game = games.find(g => g.slug === slug) ?? null
  if (game) {
    const categories = await getCategories()
    game.category = categories.find(c => c.id === game.category_id)
  }
  return game
}

export async function getGamesByCategory(categorySlug: string): Promise<Game[]> {
  const categories = await getCategories()
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) return []
  const games = await getGames()
  return games.filter(g => g.category_id === category.id)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find(c => c.slug === slug) ?? null
}

export async function searchGames(query: string): Promise<Game[]> {
  const games = await getGames()
  const q = query.toLowerCase()
  return games.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.tags.some(t => t.toLowerCase().includes(q))
  )
}
