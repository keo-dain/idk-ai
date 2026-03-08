import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oigwwlhdjqjmrozobmln.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZ3d3bGhkanFqbXJvem9ibWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzkxOTMsImV4cCI6MjA4ODQxNTE5M30.B2z9eq0UC0S7Ez20ubeoyoSdtHiprLNJf6FHGhSzJ5I";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const C = {
  bg: "#0e0f11", surface: "#161719", card: "#1c1e21", cardHover: "#222427",
  border: "#2a2d31", mint: "#7ecfb3", mintDim: "#4a9e85", mintPale: "#1a3d33",
  text: "#e8eaed", textMuted: "#7a7f87", textDim: "#4a4f57",
  danger: "#e07c7c", gold: "#d4a96a",
};

const T = {
  en: {
    home:"Home", create:"Create", chats:"Chats", profile:"Profile",
    search:"Search characters...", popular:"Popular", new:"New", following:"Following",
    createChar:"Create Character", charName:"Character name", charDesc:"Short description",
    charPersonality:"Personality & backstory", visibility:"Visibility",
    public:"Public", followers:"Followers only", private:"Private",
    publish:"Publish Character", groupChat:"Group Chat",
    send:"Send", typeMsg:"Write your message...",
    messages:"msg left", registerPrompt:"You've used 10 free messages.",
    registerNow:"Create account to continue", later:"Maybe later",
    follow:"Follow", by:"by", online:"online", tags:"Tags",
    firstMsg:"First message (greeting)", charAvatar:"Add avatar", save:"Save Draft",
    noChats:"No chats yet. Start a conversation!", guestMode:"Guest",
    msgCount:"msg", memory:"Character Memory",
    memoryHint:"Shared history, important facts, inside knowledge the character always remembers...",
    responseSize:"Response length", small:"Short", medium:"Medium", large:"Long",
    censorship:"Content filter", censorOn:"Safe mode", censorOff:"18+ mode",
    toneLabel:"Default tone", editMsg:"Edit", regenerate:"Retry",
    wallpaper:"Chat wallpaper", profileStyle:"Profile theme", saveStyle:"Save",
    chatSettings:"Chat settings", startChat:"Begin Story",
    continueChat:"Continue", lastUsed:"Last used", newChat:"New Chat",
    deleteChat:"Delete", msgs:"messages",
  },
  ru: {
    home:"Главная", create:"Создать", chats:"Чаты", profile:"Профиль",
    search:"Поиск персонажей...", popular:"Популярные", new:"Новые", following:"Подписки",
    createChar:"Создать персонажа", charName:"Имя персонажа", charDesc:"Краткое описание",
    charPersonality:"Личность и история", visibility:"Видимость",
    public:"Публичный", followers:"Для подписчиков", private:"Приватный",
    publish:"Опубликовать", groupChat:"Группа",
    send:"Отправить", typeMsg:"Напишите сообщение...",
    messages:"сообщ. осталось", registerPrompt:"Вы использовали 10 бесплатных сообщений.",
    registerNow:"Создать аккаунт", later:"Позже",
    follow:"Подписаться", by:"автор", online:"онлайн", tags:"Теги",
    firstMsg:"Первое сообщение (приветствие)", charAvatar:"Добавить аватар", save:"Черновик",
    noChats:"Чатов пока нет. Начните общение!", guestMode:"Гость",
    msgCount:"сообщ", memory:"Память персонажа",
    memoryHint:"Общая история, важные факты, знания персонажа которые он всегда помнит...",
    responseSize:"Длина ответа", small:"Короткий", medium:"Средний", large:"Длинный",
    censorship:"Фильтр контента", censorOn:"Безопасно", censorOff:"18+ режим",
    toneLabel:"Тон по умолчанию", editMsg:"Изменить", regenerate:"Переписать",
    wallpaper:"Обои чата", profileStyle:"Тема профиля", saveStyle:"Сохранить",
    chatSettings:"Настройки чата", startChat:"Начать историю",
    continueChat:"Продовжити", lastUsed:"Останній раз", newChat:"Новий чат",
    deleteChat:"Видалити", msgs:"повід",
  },
  uk: {
    home:"Головна", create:"Створити", chats:"Чати", profile:"Профіль",
    search:"Пошук персонажів...", popular:"Популярні", new:"Нові", following:"Підписки",
    createChar:"Створити персонажа", charName:"Ім'я персонажа", charDesc:"Короткий опис",
    charPersonality:"Особистість та історія", visibility:"Видимість",
    public:"Публічний", followers:"Для підписників", private:"Приватний",
    publish:"Опублікувати", groupChat:"Група",
    send:"Надіслати", typeMsg:"Напишіть повідомлення...",
    messages:"повід. залишилось", registerPrompt:"Ви використали 10 безкоштовних повідомлень.",
    registerNow:"Створити акаунт", later:"Пізніше",
    follow:"Підписатись", by:"автор", online:"онлайн", tags:"Теги",
    firstMsg:"Перше повідомлення (вітання)", charAvatar:"Додати аватар", save:"Чернетка",
    noChats:"Чатів поки немає. Почніть спілкування!", guestMode:"Гість",
    msgCount:"повід", memory:"Пам'ять персонажа",
    memoryHint:"Спільна історія, важливі факти, знання які персонаж завжди пам'ятає...",
    responseSize:"Довжина відповіді", small:"Коротка", medium:"Середня", large:"Довга",
    censorship:"Фільтр контенту", censorOn:"Безпечно", censorOff:"18+ режим",
    toneLabel:"Тон за замовчуванням", editMsg:"Змінити", regenerate:"Переписати",
    wallpaper:"Шпалери чату", profileStyle:"Тема профілю", saveStyle:"Зберегти",
    chatSettings:"Налаштування чату", startChat:"Почати історію",
    continueChat:"Продовжити", lastUsed:"Востаннє", newChat:"Новий чат",
    deleteChat:"Видалити", msgs:"повід",
  },
  de: {
    home:"Start", create:"Erstellen", chats:"Chats", profile:"Profil",
    search:"Charaktere suchen...", popular:"Beliebt", new:"Neu", following:"Abonniert",
    createChar:"Charakter erstellen", charName:"Name des Charakters", charDesc:"Kurzbeschreibung",
    charPersonality:"Persönlichkeit & Geschichte", visibility:"Sichtbarkeit",
    public:"Öffentlich", followers:"Nur Abonnenten", private:"Privat",
    publish:"Veröffentlichen", groupChat:"Gruppe",
    send:"Senden", typeMsg:"Nachricht schreiben...",
    messages:"Nachr. übrig", registerPrompt:"Du hast 10 kostenlose Nachrichten genutzt.",
    registerNow:"Konto erstellen", later:"Später",
    follow:"Folgen", by:"von", online:"online", tags:"Tags",
    firstMsg:"Erste Nachricht (Begrüßung)", charAvatar:"Avatar hinzufügen", save:"Entwurf",
    noChats:"Noch keine Chats. Starte ein Gespräch!", guestMode:"Gast",
    msgCount:"Nachr", memory:"Charakter-Gedächtnis",
    memoryHint:"Gemeinsame Geschichte, wichtige Fakten, Wissen das der Charakter immer erinnert...",
    responseSize:"Antwortlänge", small:"Kurz", medium:"Mittel", large:"Lang",
    censorship:"Inhaltsfilter", censorOn:"Sicher", censorOff:"18+ Modus",
    toneLabel:"Standard-Ton", editMsg:"Bearbeiten", regenerate:"Neu schreiben",
    wallpaper:"Chat-Hintergrund", profileStyle:"Profilthema", saveStyle:"Speichern",
    chatSettings:"Chat-Einstellungen", startChat:"Geschichte beginnen",
    continueChat:"Weiter", lastUsed:"Zuletzt", newChat:"Neuer Chat",
    deleteChat:"Löschen", msgs:"Nachr",
  },
  it: {
    home:"Home", create:"Crea", chats:"Chat", profile:"Profilo",
    search:"Cerca personaggi...", popular:"Popolari", new:"Nuovi", following:"Seguiti",
    createChar:"Crea personaggio", charName:"Nome del personaggio", charDesc:"Breve descrizione",
    charPersonality:"Personalità e storia", visibility:"Visibilità",
    public:"Pubblico", followers:"Solo follower", private:"Privato",
    publish:"Pubblica", groupChat:"Gruppo",
    send:"Invia", typeMsg:"Scrivi un messaggio...",
    messages:"msg rimasti", registerPrompt:"Hai usato 10 messaggi gratuiti.",
    registerNow:"Crea un account", later:"Dopo",
    follow:"Segui", by:"di", online:"online", tags:"Tag",
    firstMsg:"Primo messaggio (saluto)", charAvatar:"Aggiungi avatar", save:"Bozza",
    noChats:"Nessuna chat ancora. Inizia una conversazione!", guestMode:"Ospite",
    msgCount:"msg", memory:"Memoria del personaggio",
    memoryHint:"Storia condivisa, fatti importanti, conoscenze che il personaggio ricorda sempre...",
    responseSize:"Lunghezza risposta", small:"Breve", medium:"Media", large:"Lunga",
    censorship:"Filtro contenuti", censorOn:"Sicuro", censorOff:"Modalità 18+",
    toneLabel:"Tono predefinito", editMsg:"Modifica", regenerate:"Riscrivi",
    wallpaper:"Sfondo chat", profileStyle:"Tema profilo", saveStyle:"Salva",
    chatSettings:"Impostazioni chat", startChat:"Inizia la storia",
    continueChat:"Continua", lastUsed:"Ultimo uso", newChat:"Nuova chat",
    deleteChat:"Elimina", msgs:"msg",
  },
  fr: {
    home:"Accueil", create:"Créer", chats:"Chats", profile:"Profil",
    search:"Rechercher des personnages...", popular:"Populaires", new:"Nouveaux", following:"Abonnements",
    createChar:"Créer un personnage", charName:"Nom du personnage", charDesc:"Courte description",
    charPersonality:"Personnalité et histoire", visibility:"Visibilité",
    public:"Public", followers:"Abonnés seulement", private:"Privé",
    publish:"Publier", groupChat:"Groupe",
    send:"Envoyer", typeMsg:"Écrire un message...",
    messages:"msg restants", registerPrompt:"Vous avez utilisé 10 messages gratuits.",
    registerNow:"Créer un compte", later:"Plus tard",
    follow:"Suivre", by:"par", online:"en ligne", tags:"Tags",
    firstMsg:"Premier message (salutation)", charAvatar:"Ajouter avatar", save:"Brouillon",
    noChats:"Pas encore de chats. Commencez une conversation!", guestMode:"Invité",
    msgCount:"msg", memory:"Mémoire du personnage",
    memoryHint:"Histoire commune, faits importants, connaissances que le personnage se rappelle toujours...",
    responseSize:"Longueur de réponse", small:"Courte", medium:"Moyenne", large:"Longue",
    censorship:"Filtre de contenu", censorOn:"Sécurisé", censorOff:"Mode 18+",
    toneLabel:"Ton par défaut", editMsg:"Modifier", regenerate:"Réécrire",
    wallpaper:"Fond de chat", profileStyle:"Thème du profil", saveStyle:"Sauvegarder",
    chatSettings:"Paramètres du chat", startChat:"Commencer l'histoire",
    continueChat:"Continuer", lastUsed:"Dernière fois", newChat:"Nouveau chat",
    deleteChat:"Supprimer", msgs:"msg",
  },
  es: {
    home:"Inicio", create:"Crear", chats:"Chats", profile:"Perfil",
    search:"Buscar personajes...", popular:"Populares", new:"Nuevos", following:"Siguiendo",
    createChar:"Crear personaje", charName:"Nombre del personaje", charDesc:"Descripción breve",
    charPersonality:"Personalidad e historia", visibility:"Visibilidad",
    public:"Público", followers:"Solo seguidores", private:"Privado",
    publish:"Publicar", groupChat:"Grupo",
    send:"Enviar", typeMsg:"Escribe un mensaje...",
    messages:"msg restantes", registerPrompt:"Has usado 10 mensajes gratuitos.",
    registerNow:"Crear cuenta", later:"Después",
    follow:"Seguir", by:"por", online:"en línea", tags:"Etiquetas",
    firstMsg:"Primer mensaje (saludo)", charAvatar:"Añadir avatar", save:"Borrador",
    noChats:"Aún no hay chats. ¡Empieza una conversación!", guestMode:"Invitado",
    msgCount:"msg", memory:"Memoria del personaje",
    memoryHint:"Historia compartida, datos importantes, conocimientos que el personaje siempre recuerda...",
    responseSize:"Longitud de respuesta", small:"Corta", medium:"Media", large:"Larga",
    censorship:"Filtro de contenido", censorOn:"Seguro", censorOff:"Modo 18+",
    toneLabel:"Tono predeterminado", editMsg:"Editar", regenerate:"Reescribir",
    wallpaper:"Fondo de chat", profileStyle:"Tema de perfil", saveStyle:"Guardar",
    chatSettings:"Ajustes del chat", startChat:"Comenzar historia",
    continueChat:"Continuar", lastUsed:"Último uso", newChat:"Nuevo chat",
    deleteChat:"Eliminar", msgs:"msg",
  },
  pl: {
    home:"Strona główna", create:"Utwórz", chats:"Czaty", profile:"Profil",
    search:"Szukaj postaci...", popular:"Popularne", new:"Nowe", following:"Obserwowane",
    createChar:"Utwórz postać", charName:"Imię postaci", charDesc:"Krótki opis",
    charPersonality:"Osobowość i historia", visibility:"Widoczność",
    public:"Publiczny", followers:"Tylko obserwujący", private:"Prywatny",
    publish:"Opublikuj", groupChat:"Grupa",
    send:"Wyślij", typeMsg:"Napisz wiadomość...",
    messages:"wiad. pozostało", registerPrompt:"Użyłeś 10 darmowych wiadomości.",
    registerNow:"Utwórz konto", later:"Później",
    follow:"Obserwuj", by:"autor", online:"online", tags:"Tagi",
    firstMsg:"Pierwsza wiadomość (powitanie)", charAvatar:"Dodaj awatar", save:"Szkic",
    noChats:"Brak czatów. Zacznij rozmowę!", guestMode:"Gość",
    msgCount:"wiad", memory:"Pamięć postaci",
    memoryHint:"Wspólna historia, ważne fakty, wiedza którą postać zawsze pamięta...",
    responseSize:"Długość odpowiedzi", small:"Krótka", medium:"Średnia", large:"Długa",
    censorship:"Filtr treści", censorOn:"Bezpieczny", censorOff:"Tryb 18+",
    toneLabel:"Domyślny ton", editMsg:"Edytuj", regenerate:"Przepisz",
    wallpaper:"Tapeta czatu", profileStyle:"Motyw profilu", saveStyle:"Zapisz",
    chatSettings:"Ustawienia czatu", startChat:"Rozpocznij historię",
    continueChat:"Kontynuuj", lastUsed:"Ostatnio", newChat:"Nowy czat",
    deleteChat:"Usuń", msgs:"wiad",
  }
};

const MOCK_CHARS = [
  { id:1, name:"Aelindra", desc:"Ancient elven sorceress with a dark secret", tags:["fantasy","magic"], author:"moonweaver", followers:4821, msgs:"128k", color:"#2d4a3e", avatar:"🧝‍♀️", visibility:"public" },
  { id:2, name:"Viktor Crane", desc:"Cold-hearted detective in a cyberpunk city", tags:["cyberpunk","noir"], author:"neonink", followers:3102, msgs:"89k", color:"#1e2a3a", avatar:"🕵️", visibility:"public" },
  { id:3, name:"Solaris", desc:"AI aboard a dying space station", tags:["sci-fi","AI"], author:"voidecho", followers:6540, msgs:"201k", color:"#2a1e3a", avatar:"🤖", visibility:"public" },
  { id:4, name:"Marek", desc:"War veteran haunted by the past", tags:["drama","war"], author:"ashfall", followers:1923, msgs:"44k", color:"#3a2a1e", avatar:"⚔️", visibility:"public" },
  { id:5, name:"Lyra", desc:"Cheerful healer hiding a deadly curse", tags:["fantasy","romance"], author:"petalsong", followers:7812, msgs:"310k", color:"#3a1e2a", avatar:"🌸", visibility:"public" },
  { id:6, name:"Kael", desc:"Mysterious stranger from between worlds", tags:["mystery","fantasy"], author:"driftmoor", followers:2340, msgs:"67k", color:"#1e3a2a", avatar:"🌑", visibility:"public" },
  { id:7, name:"Nova", desc:"Rebellious hacker with a heart of gold", tags:["cyberpunk","action"], author:"glitchwave", followers:5210, msgs:"156k", color:"#1a2a3a", avatar:"💻", visibility:"public" },
  { id:8, name:"Seraphine", desc:"Fallen angel seeking redemption", tags:["dark","romance"], author:"eclipseborn", followers:9102, msgs:"422k", color:"#2a1a3a", avatar:"🪶", visibility:"public" },
];

const WALLPAPERS = [
  { id:"none",    label:"Default",  css:{ background:"#0e0f11" } },
  { id:"sakura",  label:"🌸 Sakura", css:{ background:"linear-gradient(160deg,#180a14 0%,#2a0d1a 60%,#180a14 100%)" }, dot:"#3d1526" },
  { id:"water",   label:"🌊 Water",  css:{ background:"linear-gradient(180deg,#090e1a 0%,#0c1830 100%)" }, dot:"#0d2040" },
  { id:"forest",  label:"🌿 Forest", css:{ background:"linear-gradient(135deg,#090e0c,#0d1a10,#090e0c)" }, dot:"#0d1e12" },
  { id:"stars",   label:"✨ Stars",  css:{ background:"linear-gradient(180deg,#07070f,#0e0e22)" }, dot:"#13132e" },
  { id:"void",    label:"🌌 Void",   css:{ background:"radial-gradient(ellipse at center,#140d1e 0%,#080810 100%)" }, dot:"#1a0d28" },
  { id:"dusk",    label:"🌅 Dusk",   css:{ background:"linear-gradient(160deg,#1a0e08,#1e1208,#0e0f11)" }, dot:"#2a180e" },
];

const PROFILE_THEMES = [
  { id:"mint",    label:"🌿 Mint",    accent:"#7ecfb3", grad:"linear-gradient(160deg,#0e1a16 0%,#0e0f11 60%)" },
  { id:"sakura",  label:"🌸 Sakura",  accent:"#e8a0bf", grad:"linear-gradient(160deg,#1a0d14 0%,#0e0f11 60%)" },
  { id:"ocean",   label:"🌊 Ocean",   accent:"#6ab8d4", grad:"linear-gradient(160deg,#0a1520 0%,#0e0f11 60%)" },
  { id:"gold",    label:"✨ Gold",    accent:"#d4a96a", grad:"linear-gradient(160deg,#1a1208 0%,#0e0f11 60%)" },
  { id:"violet",  label:"💜 Violet",  accent:"#b09fd4", grad:"linear-gradient(160deg,#140d1e 0%,#0e0f11 60%)" },
  { id:"rose",    label:"🌹 Rose",    accent:"#e07c7c", grad:"linear-gradient(160deg,#1e0d0d 0%,#0e0f11 60%)" },
];

const TONES = [
  { id:"neutral",   icon:"⚖️",  en:"Neutral",   ru:"Нейтральный" },
  { id:"romantic",  icon:"💕",  en:"Romantic",  ru:"Романтичный" },
  { id:"dominant",  icon:"👁",  en:"Dominant",  ru:"Доминантный" },
  { id:"soft",      icon:"🌸",  en:"Soft",      ru:"Мягкий" },
  { id:"rough",     icon:"⚡",  en:"Rough",     ru:"Грубый" },
  { id:"playful",   icon:"🎭",  en:"Playful",   ru:"Игривый" },
];

const AI_REPLIES = {
  romantic: [
    (n) => `*${n} looks at you quietly, something warm and unguarded crossing their features.* "I wasn't expecting to feel this way. I'm not sure I know what to do with it."`,
    (n) => `*${n}'s fingers brush yours, just barely — almost accidental.* "You make it harder to keep my distance. I hope you know that."`,
  ],
  dominant: [
    (n) => `*${n}'s gaze settles on you with the weight of someone who is used to being obeyed.* "You'll do as I say. That's not a request."`,
    (n) => `*${n} tilts their head slowly, voice low and measured.* "I decide how this plays out. Not you. We clear?"`,
  ],
  soft: [
    (n) => `*${n} smiles quietly, the kind that doesn't need an audience.* "You don't have to explain yourself. I understand. Take your time."`,
    (n) => `*${n} reaches out carefully, not quite touching.* "I'm not going anywhere. Whatever you need."`,
  ],
  rough: [
    (n) => `*${n} scoffs, gaze sliding sideways.* "Don't read into it. I just happened to be here."`,
    (n) => `*${n} crosses their arms, jaw set.* "Say what you want. Doesn't change anything."`,
  ],
  playful: [
    (n) => `*${n}'s eyes light up with that particular brand of trouble.* "Oh? And you think that's going to work on me? Adorable."`,
    (n) => `*${n} gasps with exaggerated offense.* "You did NOT just say that. I am personally wounded. Devastated, even."`,
  ],
  neutral: [
    (n) => `*${n} studies you with quiet precision, something unreadable behind their eyes.* "There are things I can't tell you yet. Stay close — that might change."`,
    (n) => `*The silence between you stretches, weighted with things unsaid.* "${n} finally speaks. "You're more perceptive than I gave you credit for."`,
  ],
};

function timeAgo(dateStr, lang = "en") {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const labels = {
    en:  { now:"just now", m:"min ago",  h:"hr ago",  d:"d ago" },
    uk:  { now:"щойно",    m:"хв тому",  h:"год тому", d:"дн тому" },
    ru:  { now:"только что", m:"мин назад", h:"ч назад", d:"дн назад" },
    de:  { now:"gerade",   m:"Min.",     h:"Std.",    d:"T." },
    it:  { now:"adesso",   m:"min fa",   h:"ore fa",  d:"g fa" },
    fr:  { now:"maintenant", m:"min",    h:"h",       d:"j" },
    es:  { now:"ahora",    m:"min",      h:"h",       d:"d" },
    pl:  { now:"teraz",    m:"min temu", h:"godz. temu", d:"dni temu" },
  };
  const l = labels[lang] || labels.en;
  if (mins < 1)   return l.now;
  if (mins < 60)  return `${mins} ${l.m}`;
  if (hours < 24) return `${hours} ${l.h}`;
  return `${days} ${l.d}`;
}

async function translateRoleplayText(text, targetLang) {
  const langNames = { en:"English", ru:"Russian", uk:"Ukrainian", de:"German", it:"Italian", fr:"French", es:"Spanish", pl:"Polish" };
  const target = langNames[targetLang] || "English";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:600,
        messages:[{ role:"user", content:`Translate this roleplay message to ${target}. Keep *actions in asterisks* as-is style (translate content but keep asterisks). Keep the tone, emotion, and literary style. Return ONLY the translated text, nothing else:\n\n${text}` }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text?.trim() || text;
  } catch { return text; }
}

const FREE_LIMIT = 10;

export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [msgCount, setMsgCount] = useState(0);
  const [showReg, setShowReg] = useState(false);
  const [isReg, setIsReg] = useState(false);

  const [sessions, setSessions]       = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [homeTab, setHomeTab] = useState("popular");
  const [followed, setFollowed] = useState([]);
  const [likedChars, setLikedChars] = useState([]);
  const [groupMode, setGroupMode] = useState(false);
  const [groupChars, setGroupChars] = useState([]);
  const [profileTheme, setProfileTheme] = useState("mint");
  const [textScale, setTextScale] = useState("md");
  const [supaUser, setSupaUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ displayName: "", bio: "", avatarEmoji: "🌙" });
  const [myCharsDB, setMyCharsDB] = useState([]);

  const t = T[lang];

  const loadSessions = useCallback(async (userId) => {
    if (!userId) return;
    setSessionsLoading(true);
    const { data } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", userId)
      .order("last_used_at", { ascending: false });
    if (data) setSessions(data);
    setSessionsLoading(false);
  }, []);

  const loadMessages = async (sessionId) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    return (data || []).map(m => ({
      id: m.id,
      role: m.role,
      text: m.text,
      originalText: m.original_text,
      charName: m.char_name,
      charAvatar: m.char_avatar,
    }));
  };

  const loadMyChars = async (userId) => {
    const { data } = await supabase.from("characters").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (data) setMyCharsDB(data);
  };

  const loadUserData = async (user) => {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (profile) {
      setUserProfile({
        displayName: profile.display_name || "",
        bio: profile.bio || "",
        avatarEmoji: profile.avatar_emoji || "🌙",
        avatarPhoto: profile.avatar_photo || null,
      });
      if (profile.profile_theme) setProfileTheme(profile.profile_theme);
      if (profile.text_scale) setTextScale(profile.text_scale);
    }
    const { data: likes } = await supabase.from("liked_chars").select("char_id").eq("user_id", user.id);
    if (likes) setLikedChars(likes.map(l => l.char_id));
    const { data: followsData } = await supabase.from("follows").select("author").eq("user_id", user.id);
    if (followsData) setFollowed(followsData.map(f => f.author));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupaUser(session.user);
        setIsReg(true);
        loadUserData(session.user);
        loadMyChars(session.user.id);
        loadSessions(session.user.id);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupaUser(session.user);
        setIsReg(true);
        loadUserData(session.user);
        loadMyChars(session.user.id);
        loadSessions(session.user.id);
      } else {
        setSupaUser(null); setIsReg(false); setLikedChars([]); setFollowed([]);
        setUserProfile({ displayName:"", bio:"", avatarEmoji:"🌙" });
        setMyCharsDB([]); setSessions([]); setActiveSession(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [loadSessions]);

  const pt = PROFILE_THEMES.find(p => p.id === profileTheme) || PROFILE_THEMES[0];

  const TEXT_SCALES = {
    xs: { label:"XS", fontSize:11, lineHeight:1.55, botExtra:"short",  desc: lang==="ru"?"Дуже дрібний · Короткі відповіді":"Tiny · Brief replies" },
    sm: { label:"S",  fontSize:12, lineHeight:1.6,  botExtra:"short",  desc: lang==="ru"?"Дрібний · Короткі відповіді":"Small · Brief replies" },
    md: { label:"M",  fontSize:13, lineHeight:1.7,  botExtra:"medium", desc: lang==="ru"?"Середній · Звичайні відповіді":"Medium · Normal replies" },
    lg: { label:"L",  fontSize:15, lineHeight:1.75, botExtra:"large",  desc: lang==="ru"?"Великий · Довгі відповіді":"Large · Extended replies" },
    xl: { label:"XL", fontSize:17, lineHeight:1.8,  botExtra:"large",  desc: lang==="ru"?"Дуже великий · Довгі відповіді":"Extra large · Long replies" },
  };
  const ts = TEXT_SCALES[textScale];

  // ── Open / continue a chat ─────────────────────────────────────────────────
  const openChat = async (chars, settings = {}) => {
    const charsArr = Array.isArray(chars) ? chars : [chars];

    if (isReg && supaUser) {
      const { data: newSession, error } = await supabase
        .from("sessions")
        .insert({
          user_id: supaUser.id,
          chars: charsArr,
          wallpaper: settings.wallpaper || "none",
          censorship: settings.censorship ?? true,
          tone: settings.tone || "neutral",
          response_size: settings.responseSize || "medium",
        })
        .select()
        .single();

      if (!error && newSession) {
        // Store customBg in memory only (not in DB — it's a blob URL)
        const session = { ...newSession, messages: [], customBg: settings.customBg || null };
        setSessions(prev => [newSession, ...prev]);
        setActiveSession(session);
        setPage("chat");
        return;
      }
    }

    // Guest fallback
    const id = Date.now();
    const session = {
      id,
      chars: charsArr,
      messages: [],
      group: charsArr.length > 1,
      wallpaper: settings.wallpaper || "none",
      customBg: settings.customBg || null,
      censorship: settings.censorship ?? true,
      tone: settings.tone || "neutral",
      response_size: settings.responseSize || "medium",
    };
    setActiveSession(session);
    setPage("chat");
  };

  const continueSession = async (session) => {
    const messages = await loadMessages(session.id);
    setActiveSession({ ...session, messages });
    setPage("chat");
  };

  const deleteSession = async (sessionId) => {
    await supabase.from("sessions").delete().eq("id", sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSession?.id === sessionId) setActiveSession(null);
  };

  const sendMessage = async (text) => {
    if (!isReg && msgCount >= FREE_LIMIT) { setShowReg(true); return; }

    const userMsg = { id: `local-${Date.now()}`, role: "user", text };
    setActiveSession(prev => ({ ...prev, messages: [...(prev.messages || []), userMsg] }));

    if (isReg && activeSession?.id && typeof activeSession.id === "string") {
      await supabase.from("messages").insert({ session_id: activeSession.id, role: "user", text });
      loadSessions(supaUser.id);
    }

    setTimeout(async () => {
      const session = activeSession;
      const charsArr = session.chars || [];
      const char = charsArr[Math.floor(Math.random() * charsArr.length)];
      const tone = session.tone || "neutral";
      const size = session.response_size || session.responseSize || "medium";

      const AI_REPLIES_LOCALIZED = {
        en: AI_REPLIES,
        ru: {
          romantic: [(n) => `*${n} смотрит на тебя тихо, что-то тёплое мелькает в их взгляде.* Я не ожидал чувствовать это. Не знаю, что с этим делать.`,(n) => `*Пальцы ${n} едва касаются твоих — почти случайно.* Ты делаешь сложнее держать дистанцию. Надеюсь, ты это знаешь.`],
          dominant: [(n) => `*Взгляд ${n} останавливается на тебе с весом того, кто привык к подчинению.* Делай, как я говорю. Это не просьба.`,(n) => `*${n} медленно наклоняет голову, голос низкий и размеренный.* Я решаю, как это будет. Не ты. Понятно?`],
          soft: [(n) => `*${n} тихо улыбается — той улыбкой, которой не нужна аудитория.* Тебе не нужно объяснять. Я понимаю. Не торопись.`,(n) => `*${n} осторожно тянется к тебе, не касаясь.* Я никуда не ухожу. Что бы тебе ни понадобилось.`],
          rough: [(n) => `*${n} фыркает, взгляд скользит в сторону.* Не читай между строк. Я просто оказался здесь.`,(n) => `*${n} скрещивает руки, сжав челюсть.* Говори что хочешь. Это ничего не меняет.`],
          playful: [(n) => `*Глаза ${n} загораются тем особым озорством.* О? И ты думаешь, это на меня подействует? Мило.`,(n) => `*${n} делает вид, что потрясён до глубины души.* Ты только что ЭТОГО не сказал. Я лично ранен. Раздавлен.`],
          neutral: [(n) => `*${n} изучает тебя с тихой точностью, что-то нечитаемое за их взглядом.* Есть вещи, которые я пока не могу сказать. Оставайся рядом — это может измениться.`,(n) => `*Тишина между вами растягивается, отягощённая невысказанным.* ${n} наконец говорит: Ты проницательнее, чем я думал.`],
        },
        uk: {
          romantic: [(n) => `*${n} тихо дивиться на тебе, щось тепле промайнуло в їхньому погляді.* Я не очікував відчути це. Не знаю, що з цим робити.`,(n) => `*Пальці ${n} ледь торкаються твоїх — майже випадково.* Ти ускладнюєш дистанцію. Сподіваюсь, ти це знаєш.`],
          dominant: [(n) => `*Погляд ${n} зупиняється на тобі з вагою того, хто звик до підкорення.* Робиш як я кажу. Це не прохання.`,(n) => `*${n} повільно нахиляє голову, голос низький і виважений.* Я вирішую як це буде. Не ти. Зрозуміло?`],
          soft: [(n) => `*${n} тихо усміхається — тією посмішкою, якій не потрібна аудиторія.* Тобі не треба пояснювати. Я розумію. Не поспішай.`,(n) => `*${n} обережно тягнеться до тебе, не торкаючись.* Я нікуди не йду. Що б тобі не знадобилось.`],
          rough: [(n) => `*${n} фиркає, погляд ковзає вбік.* Не читай між рядків. Я просто опинився тут.`,(n) => `*${n} схрещує руки, стиснувши щелепу.* Кажи що хочеш. Це нічого не змінює.`],
          playful: [(n) => `*Очі ${n} загораються тим особливим пустощами.* О? І ти думаєш це на мене подіє? Мило.`,(n) => `*${n} вдає що вражений до глибини душі.* Ти щойно ЦЬОГО не сказав. Я особисто поранений. Спустошений.`],
          neutral: [(n) => `*${n} вивчає тебе з тихою точністю, щось нечитане за їхнім поглядом.* Є речі, які я поки не можу сказати. Залишайся поруч — це може змінитись.`,(n) => `*Тиша між вами розтягується, обтяжена невисловленим.* ${n} нарешті каже: Ти проникливіший, ніж я думав.`],
        },
      };

      const localReplies = AI_REPLIES_LOCALIZED[lang] || AI_REPLIES;
      const pool = localReplies[tone] || localReplies.neutral || AI_REPLIES.neutral;
      let reply = pool[Math.floor(Math.random() * pool.length)](char.name);

      if (size === "small") { const s = reply.match(/[^.!?]+[.!?]+/g) || [reply]; reply = s.slice(0,1).join("").trim(); }
      if (size === "medium") { const s = reply.match(/[^.!?]+[.!?]+/g) || [reply]; reply = s.slice(0,2).join("").trim(); }
      if (size === "large") {
        reply += ` *${char.name} lets the silence stretch, watching you with quiet intensity that makes the air feel heavier.* "But then again — maybe that's exactly why you're still here."`;
      }

      const aiMsg = {
        id: `local-ai-${Date.now()}`,
        role: "ai",
        charName: char.name,
        charAvatar: char.avatar,
        text: reply,
        originalText: reply,
      };

      if (isReg && session?.id && typeof session.id === "string") {
        const { data: saved } = await supabase.from("messages").insert({
          session_id: session.id,
          role: "ai",
          text: reply,
          original_text: reply,
          char_name: char.name,
          char_avatar: char.avatar,
        }).select().single();
        if (saved) aiMsg.id = saved.id;
        loadSessions(supaUser.id);
      }

      setActiveSession(prev => {
        if (!prev) return prev;
        return { ...prev, messages: [...(prev.messages || []), aiMsg] };
      });
    }, 850);

    if (!isReg) setMsgCount(n => n + 1);
  };

  const editMessage = (sessionId, msgId, newText) => {
    setActiveSession(prev => {
      if (!prev || prev.id !== sessionId) return prev;
      return { ...prev, messages: prev.messages.map(m => m.id === msgId ? { ...m, text: newText } : m) };
    });
    if (isReg && typeof msgId === "string" && !msgId.startsWith("local")) {
      supabase.from("messages").update({ text: newText }).eq("id", msgId);
    }
  };

  useEffect(() => {
    if (!activeSession?.messages?.length) return;
    const translateMsgs = async () => {
      const translated = await Promise.all(
        activeSession.messages.map(async (msg) => {
          if (msg.role !== "ai" || !msg.originalText) return msg;
          const translatedText = await translateRoleplayText(msg.originalText, lang);
          return { ...msg, text: translatedText };
        })
      );
      setActiveSession(prev => prev ? { ...prev, messages: translated } : prev);
    };
    translateMsgs();
  }, [lang]); // eslint-disable-line

  const filtered = MOCK_CHARS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:C.bg, color:C.text, width:"100%", height:"100dvh", minHeight:"100dvh", maxHeight:"100dvh", display:"flex", flexDirection:"column", maxWidth:430, margin:"0 auto", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Syne:wght@600;700;800&display=swap');
        html,body,#root{height:100%;height:100dvh;overflow:hidden;margin:0;padding:0}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#2a2d31;border-radius:2px}
        input,textarea{outline:none}
        button{cursor:pointer;border:none;background:none}
        .cc{transition:all .18s ease}
        .cc:hover{background:${C.cardHover}!important;transform:translateY(-2px)}
        .pill{font-size:10px;padding:2px 8px;border-radius:20px;background:${C.mintPale};color:${C.mint};font-weight:600}
        textarea:focus{border-color:${C.mint}!important}
        input:focus{border-color:${C.mint}!important}
        .mb{animation:fu .22s ease}
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .nb{transition:all .15s}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .fab{transition:all .15s}
        .fab:hover{opacity:.85;transform:translateY(-1px)}
        .session-card:hover .del-btn{opacity:1!important}
      `}</style>

      {page !== "chat" && (
        <div style={{ padding:"13px 18px 10px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, background:C.bg, flexShrink:0 }}>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:C.mint, letterSpacing:-0.5 }}>IDK ai</span>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <LangPicker lang={lang} setLang={setLang} />
            {!isReg && <div style={{ fontSize:11, color:C.textMuted, padding:"4px 10px", borderRadius:20, background:C.card, border:`1px solid ${C.border}` }}>{t.guestMode} · {Math.max(0,FREE_LIMIT-msgCount)} {t.messages}</div>}
          </div>
        </div>
      )}

      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", display:"flex", flexDirection:"column", minHeight:0 }}>
        {page==="home"    && <div style={{ flex:1 }}><HomePage    t={t} chars={filtered} search={search} setSearch={setSearch} homeTab={homeTab} setHomeTab={setHomeTab} followed={followed} setFollowed={setFollowed} likedChars={likedChars} setLikedChars={setLikedChars} openChat={openChat} groupMode={groupMode} setGroupMode={setGroupMode} groupChars={groupChars} setGroupChars={setGroupChars} lang={lang} /></div>}
        {page==="create"  && <div style={{ flex:1 }}><CreatePage  t={t} lang={lang} supaUser={supaUser} onCharCreated={()=>supaUser&&loadMyChars(supaUser.id)} onOpenImported={(char)=>{ openChat(char, { tone: char.tone||"neutral" }); }} /></div>}
        {page==="chats"   && <div style={{ flex:1 }}><ChatsPage   t={t} sessions={sessions} sessionsLoading={sessionsLoading} onContinue={continueSession} onDelete={deleteSession} lang={lang} isReg={isReg} onShowAuth={()=>setShowReg(true)} /></div>}
        {page==="profile" && <div style={{ flex:1 }}><ProfilePage t={t} isReg={isReg} setIsReg={setIsReg} profileTheme={profileTheme} setProfileTheme={setProfileTheme} pt={pt} textScale={textScale} setTextScale={setTextScale} TEXT_SCALES={TEXT_SCALES} ts={ts} lang={lang} supaUser={supaUser} onShowAuth={()=>setShowReg(true)} followed={followed} likedChars={likedChars} userProfile={userProfile} setUserProfile={setUserProfile} myCharsDB={myCharsDB} /></div>}
        {page==="chat" && activeSession && <ChatPage t={t} chat={activeSession} onSend={sendMessage} onBack={() => { setPage("chats"); loadSessions(supaUser?.id); }} msgCount={msgCount} isReg={isReg} editMessage={editMessage} lang={lang} ts={ts} />}
      </div>

      {groupMode && groupChars.length > 0 && page==="home" && (
        <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, padding:"10px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {groupChars.map(c => <span key={c.id} style={{ fontSize:22 }}>{c.avatar}</span>)}
            <span style={{ fontSize:12, color:C.textMuted, marginLeft:4 }}>{groupChars.length} selected</span>
          </div>
          <button className="fab" onClick={() => { openChat(groupChars); setGroupMode(false); setGroupChars([]); }} style={{ background:C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:13, padding:"8px 18px", borderRadius:20 }}>{t.groupChat} →</button>
        </div>
      )}

      {page !== "chat" && (
        <div style={{ display:"flex", background:C.surface, borderTop:`1px solid ${C.border}`, padding:"8px 0 14px", flexShrink:0 }}>
          {[{id:"home",icon:"⊞",label:t.home},{id:"create",icon:"✦",label:t.create},{id:"chats",icon:"◈",label:t.chats},{id:"profile",icon:"◉",label:t.profile}].map(nav => (
            <button key={nav.id} className="nb" onClick={() => setPage(nav.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"6px 0" }}>
              <span style={{ fontSize:20, opacity:page===nav.id?1:0.28, filter:page===nav.id?`drop-shadow(0 0 7px ${C.mint})`:"none", transition:"all .2s" }}>{nav.icon}</span>
              <span style={{ fontSize:10, fontWeight:700, color:page===nav.id?C.mint:C.textDim, letterSpacing:.5, textTransform:"uppercase" }}>{nav.label}</span>
            </button>
          ))}
        </div>
      )}

      {showReg && (
        <AuthModal t={t} C={C} onClose={() => setShowReg(false)} onSuccess={(user) => { setIsReg(true); setShowReg(false); }} />
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ t, chars, search, setSearch, homeTab, setHomeTab, followed, setFollowed, likedChars, setLikedChars, openChat, groupMode, setGroupMode, groupChars, setGroupChars, lang }) {
  const [setupChar, setSetupChar] = useState(null);
  const toggleFollow = async (e, author) => {
    e.stopPropagation();
    const isFollowed = followed.includes(author);
    setFollowed(p => isFollowed ? p.filter(f=>f!==author) : [...p, author]);
    const uid = (await supabase.auth.getUser()).data.user?.id;
    if (!uid) return;
    if (isFollowed) { await supabase.from("follows").delete().eq("user_id", uid).eq("author", author); }
    else { await supabase.from("follows").insert({ user_id: uid, author }); }
  };
  const toggleLike = async (e, charId) => {
    e.stopPropagation();
    const isLiked = likedChars.includes(charId);
    setLikedChars(p => isLiked ? p.filter(f=>f!==charId) : [...p, charId]);
    const uid = (await supabase.auth.getUser()).data.user?.id;
    if (!uid) return;
    if (isLiked) { await supabase.from("liked_chars").delete().eq("user_id", uid).eq("char_id", charId); }
    else { await supabase.from("liked_chars").insert({ user_id: uid, char_id: charId }); }
  };
  const toggleGroup = (char) => setGroupChars(p => p.find(c=>c.id===char.id) ? p.filter(c=>c.id!==char.id) : [...p, char]);
  const display = homeTab==="following" ? chars.filter(c=>followed.includes(c.author)) : chars;

  return (
    <div style={{ padding:"14px 13px 8px" }}>
      <div style={{ position:"relative", marginBottom:13 }}>
        <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:C.mintDim, fontSize:15 }}>⌕</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{ width:"100%", background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"11px 13px 11px 36px", color:C.text, fontSize:14, fontFamily:"inherit" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
        <div style={{ display:"flex", background:C.card, borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
          {["popular","new","following"].map(tab => (
            <button key={tab} onClick={()=>setHomeTab(tab)} style={{ padding:"7px 12px", fontSize:11, fontWeight:700, fontFamily:"inherit", color:homeTab===tab?C.bg:C.textMuted, background:homeTab===tab?C.mint:"transparent", textTransform:"capitalize" }}>{t[tab]||tab}</button>
          ))}
        </div>
        <button onClick={()=>{ setGroupMode(g=>!g); if(groupMode) setGroupChars([]); }} style={{ padding:"7px 11px", fontSize:11, fontWeight:700, fontFamily:"inherit", color:groupMode?C.bg:C.mint, background:groupMode?C.mint:C.mintPale, borderRadius:12 }}>⊕ {t.groupChat}</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {display.map(char => {
          const inG = groupChars.find(c=>c.id===char.id);
          const liked = likedChars.includes(char.id);
          return (
            <div key={char.id} className="cc" onClick={()=>groupMode?toggleGroup(char):setSetupChar(char)} style={{ background:C.card, borderRadius:16, overflow:"hidden", border:`1.5px solid ${inG?C.mint:C.border}`, cursor:"pointer", position:"relative" }}>
              {inG && <div style={{ position:"absolute", top:8, right:8, background:C.mint, borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:C.bg, fontWeight:800, zIndex:2 }}>✓</div>}
              <div style={{ background:char.color, height:86, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, position:"relative" }}>
                {char.avatar}
                <button onClick={e=>toggleLike(e,char.id)} style={{ position:"absolute", bottom:6, right:8, fontSize:16, background:"rgba(14,15,17,.6)", borderRadius:"50%", width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${liked?"#e07c7c":C.border}` }}>
                  {liked ? "❤️" : "🤍"}
                </button>
              </div>
              <div style={{ padding:"10px 10px 12px" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, marginBottom:3 }}>{char.name}</div>
                <div style={{ fontSize:11, color:C.textMuted, lineHeight:1.4, marginBottom:7, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{char.desc}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:7 }}>{char.tags.map(tag=><span key={tag} className="pill">{tag}</span>)}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontSize:10, color:C.textDim }}>{t.by} <span style={{ color:C.mint }}>{char.author}</span></div>
                  <button onClick={e=>toggleFollow(e,char.author)} style={{ fontSize:10, padding:"3px 9px", borderRadius:20, fontFamily:"inherit", fontWeight:700, color:followed.includes(char.author)?C.bg:C.mint, background:followed.includes(char.author)?C.mint:C.mintPale }}>{followed.includes(char.author)?"✓":t.follow}</button>
                </div>
              </div>
            </div>
          );
        })}
        {display.length===0 && <div style={{ gridColumn:"1/-1", textAlign:"center", color:C.textMuted, padding:"40px 0", fontSize:13 }}>{homeTab==="following"?"Follow some authors first.":"No characters found."}</div>}
      </div>
      {setupChar && <ChatSetupModal char={setupChar} t={t} lang={lang} onStart={s=>{ openChat(setupChar,s); setSetupChar(null); }} onClose={()=>setSetupChar(null)} />}
    </div>
  );
}

// ─── CHAT SETUP MODAL (з підтримкою кастомного фото фону) ────────────────────
function ChatSetupModal({ char, t, lang, onStart, onClose }) {
  const [wallpaper, setWallpaper] = useState("none");
  const [customBg, setCustomBg] = useState(null);
  const [censor, setCensor] = useState(true);
  const [tone, setTone] = useState("neutral");
  const [size, setSize] = useState("medium");
  const bgFileRef = useRef(null);

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomBg(url);
    setWallpaper("custom");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:80, backdropFilter:"blur(5px)" }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"22px 22px 0 0", padding:"18px 18px 30px", width:"100%", maxWidth:430, maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ width:34, height:3, background:C.border, borderRadius:2, margin:"0 auto 14px" }} />
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
          <span style={{ fontSize:30 }}>{char.avatar}</span>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15 }}>{char.name}</div>
            <div style={{ fontSize:11, color:C.textMuted }}>{t.chatSettings}</div>
          </div>
        </div>

        <Lbl>{t.wallpaper}</Lbl>
        {/* Hidden file input for custom bg */}
        <input ref={bgFileRef} type="file" accept="image/*" onChange={handleBgUpload} style={{ display:"none" }} />

        <div style={{ display:"flex", gap:8, marginBottom:10, overflowX:"auto", paddingBottom:4 }}>
          {/* Custom photo button */}
          <button onClick={() => bgFileRef.current?.click()} style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{
              width:46, height:46, borderRadius:12,
              border:`2px solid ${wallpaper==="custom" ? C.mint : C.border}`,
              background: customBg ? `url(${customBg}) center/cover` : C.card,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18, overflow:"hidden"
            }}>
              {!customBg && "🖼"}
            </div>
            <span style={{ fontSize:10, color:wallpaper==="custom"?C.mint:C.textMuted, fontWeight:600, whiteSpace:"nowrap" }}>My photo</span>
          </button>

          {WALLPAPERS.map(w => (
            <button key={w.id} onClick={()=>{ setWallpaper(w.id); setCustomBg(null); }} style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:46, height:46, borderRadius:12, ...w.css, border:`2px solid ${wallpaper===w.id && !customBg ? C.mint : C.border}`, backgroundSize:"cover" }} />
              <span style={{ fontSize:10, color:wallpaper===w.id && !customBg ? C.mint : C.textMuted, fontWeight:600, whiteSpace:"nowrap" }}>{w.label}</span>
            </button>
          ))}
        </div>

        {/* Custom bg preview */}
        {customBg && (
          <div style={{ marginBottom:14, borderRadius:12, overflow:"hidden", height:80, position:"relative" }}>
            <img src={customBg} alt="bg preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.35)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontSize:12, fontWeight:700 }}>✓ Custom photo selected</span>
            </div>
            <button onClick={()=>{ setCustomBg(null); setWallpaper("none"); }} style={{ position:"absolute", top:6, right:6, background:"rgba(0,0,0,.65)", color:"#fff", borderRadius:"50%", width:22, height:22, fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
          </div>
        )}

        <Lbl>{t.censorship}</Lbl>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {[[true,"🛡",t.censorOn],[false,"🔥",t.censorOff]].map(([val,icon,label])=>(
            <button key={String(val)} onClick={()=>setCensor(val)} style={{ flex:1, padding:"10px 6px", borderRadius:12, border:`1.5px solid ${censor===val?C.mint:C.border}`, background:censor===val?C.mintPale:C.card, color:censor===val?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:700, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{icon} {label}</button>
          ))}
        </div>
        <Lbl>{t.toneLabel}</Lbl>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7, marginBottom:18 }}>
          {TONES.map(tn=>(
            <button key={tn.id} onClick={()=>setTone(tn.id)} style={{ padding:"9px 4px", borderRadius:12, border:`1.5px solid ${tone===tn.id?C.mint:C.border}`, background:tone===tn.id?C.mintPale:C.card, color:tone===tn.id?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:600, fontSize:10, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
              <span style={{ fontSize:17 }}>{tn.icon}</span>{lang==="ru"?tn.ru:tn.en}
            </button>
          ))}
        </div>
        <Lbl>{t.responseSize}</Lbl>
        <div style={{ display:"flex", gap:8, marginBottom:22 }}>
          {[["small","📝",t.small],["medium","📄",t.medium],["large","📜",t.large]].map(([val,icon,label])=>(
            <button key={val} onClick={()=>setSize(val)} style={{ flex:1, padding:"9px 4px", borderRadius:12, border:`1.5px solid ${size===val?C.mint:C.border}`, background:size===val?C.mintPale:C.card, color:size===val?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:700, fontSize:11, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><span style={{ fontSize:15 }}>{icon}</span>{label}</button>
          ))}
        </div>
        <button onClick={()=>onStart({ wallpaper, customBg, censorship:censor, tone, responseSize:size })} style={{ width:"100%", background:C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:15, padding:"14px 0", borderRadius:16, marginBottom:10 }}>▶ {t.startChat}</button>
        <button onClick={onClose} style={{ width:"100%", color:C.textMuted, fontFamily:"inherit", fontSize:13, padding:"8px 0" }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── CREATE ───────────────────────────────────────────────────────────────────
function CreatePage({ t, lang, supaUser, onCharCreated, onOpenImported }) {
  const [activeTab, setActiveTab] = useState("create"); // "create" | "import"
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [personality, setPersonality] = useState("");
  const [firstMsg, setFirstMsg] = useState("");
  const [memory, setMemory] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [tags, setTags] = useState("");
  const [size, setSize] = useState("medium");
  const [censor, setCensor] = useState(true);
  const [tone, setTone] = useState("neutral");
  const [saved, setSaved] = useState(false);
  const [autoName, setAutoName] = useState("");
  const [autoTheme, setAutoTheme] = useState("");
  const [autoOptions, setAutoOptions] = useState([]);
  const [autoLoading, setAutoLoading] = useState(false);
  const [showAuto, setShowAuto] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  // Import from link
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importedChar, setImportedChar] = useState(null);
  const [importError, setImportError] = useState("");

  const handleImport = async () => {
    if (!importUrl.trim()) return;
    setImporting(true);
    setImportError("");
    setImportedChar(null);
    try {
      const prompt = `You are a character extraction assistant. The user has provided a URL or text from a roleplay platform (Character.AI, Janitor AI, Chub.ai, NovelAI, etc.).

URL/Link provided: ${importUrl}

Based on this URL or any context you can infer, create a plausible character profile. If it's a real platform URL try to extract info from the URL slug/path. Otherwise create a character inspired by the URL context.

Respond ONLY with a valid JSON object (no markdown, no explanation):
{
  "name": "character name",
  "desc": "short one-line description",
  "personality": "detailed personality and backstory (3-5 sentences)",
  "firstMsg": "opening roleplay message with *actions in asterisks*",
  "tags": ["tag1", "tag2"],
  "tone": "neutral|romantic|dominant|soft|rough|playful",
  "source": "platform name if recognizable"
}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "{}";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (parsed.name) {
        setImportedChar(parsed);
      } else {
        setImportError("Could not extract character from this link. Try pasting the character name or description instead.");
      }
    } catch {
      setImportError("Something went wrong. Try pasting the character name or description directly.");
    }
    setImporting(false);
  };

  const useImportedChar = () => {
    if (!importedChar) return;
    const CHAR_COLORS = ["#2d4a3e","#1e2a3a","#2a1e3a","#3a2a1e","#3a1e2a","#1e3a2a","#1a2a3a","#2a1a3a"];
    const CHAR_AVATARS = ["🧝‍♀️","🕵️","🤖","⚔️","🌸","🌑","💻","🪶","🐉","🦋","🔮","🌙","⭐","🦊","🐺"];
    const charObj = {
      id: `imported-${Date.now()}`,
      name: importedChar.name,
      desc: importedChar.desc,
      personality: importedChar.personality,
      tags: importedChar.tags || [],
      author: "imported",
      followers: 0,
      msgs: "0",
      color: CHAR_COLORS[Math.floor(Math.random() * CHAR_COLORS.length)],
      avatar: CHAR_AVATARS[Math.floor(Math.random() * CHAR_AVATARS.length)],
      firstMsg: importedChar.firstMsg,
      tone: importedChar.tone || "neutral",
      visibility: "private",
      source: importedChar.source || "external",
    };
    onOpenImported(charObj);
  };

  const CHAR_COLORS = ["#2d4a3e","#1e2a3a","#2a1e3a","#3a2a1e","#3a1e2a","#1e3a2a","#1a2a3a","#2a1a3a"];
  const CHAR_AVATARS = ["🧝‍♀️","🕵️","🤖","⚔️","🌸","🌑","💻","🪶","🐉","🦋","🔮","🌙","⭐","🦊","🐺"];

  const handlePublish = async () => {
    if (!name.trim()) { alert("Please add a character name!"); return; }
    if (!supaUser) { alert("Please sign in to publish characters!"); return; }
    setPublishing(true);
    const randomColor = CHAR_COLORS[Math.floor(Math.random() * CHAR_COLORS.length)];
    const randomAvatar = CHAR_AVATARS[Math.floor(Math.random() * CHAR_AVATARS.length)];
    const { error } = await supabase.from("characters").insert({
      user_id: supaUser.id,
      name: name.trim(),
      description: desc.trim(),
      personality: personality.trim(),
      first_message: firstMsg.trim(),
      memory: memory.trim(),
      tags: tags.split(",").map(t=>t.trim()).filter(Boolean),
      visibility,
      avatar_emoji: randomAvatar,
      avatar_color: randomColor,
      response_size: size,
      tone,
      censorship: censor,
    });
    if (error) { alert("Error: " + error.message); }
    else {
      setPublished(true);
      setName(""); setDesc(""); setPersonality(""); setFirstMsg(""); setMemory(""); setTags("");
      onCharCreated?.();
      setTimeout(() => setPublished(false), 3000);
    }
    setPublishing(false);
  };

  const THEMES_PRESET = lang==="ru"
    ? ["фентезі","кіберпанк","романтика","жах","містика","пригоди","наукова фантастика","темне фентезі","сучасна драма","постапокаліпсис"]
    : ["fantasy","cyberpunk","romance","horror","mystery","adventure","sci-fi","dark fantasy","modern drama","post-apocalyptic"];

  const generateOptions = async () => {
    if (!autoName.trim()) return;
    setAutoLoading(true);
    setAutoOptions([]);
    const theme = autoTheme || (lang==="ru" ? "фентезі" : "fantasy");
    const prompt = lang==="ru"
      ? `Придумай 5 разных вариантов первого рольового сообщения для персонажа по имени "${autoName}" в жанре "${theme}". Каждый вариант должен быть уникальным по стилю: один загадочный, один романтический, один доминантный, один мягкий, один игривый. Формат: JSON массив из 5 строк, только JSON без пояснений. Каждое сообщение 2-4 предложения, включает действие в *звёздочках* и диалог в кавычках.`
      : `Generate 5 different opening roleplay messages for a character named "${autoName}" in the genre "${theme}". Make each unique in style: one mysterious, one romantic, one dominant, one soft, one playful. Format: JSON array of 5 strings, JSON only, no explanation. Each message 2-4 sentences with action in *asterisks* and dialogue in quotes.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "[]";
      const clean = raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setAutoOptions(Array.isArray(parsed) ? parsed : []);
    } catch(e) {
      setAutoOptions([
        `*${autoName} emerges from the shadows, eyes gleaming with centuries of secrets.* "You shouldn't be here. And yet... here you are."`,
        `*${autoName} turns slowly, a quiet smile playing at the corners of their lips.* "I've been waiting for someone like you. I just didn't know it until now."`,
        `*${autoName} looks you over with cool, unhurried appraisal.* "Interesting. Most people don't make it this far. You must have something worth keeping."`,
        `*${autoName} steps closer, voice soft as falling snow.* "You look lost. That's alright — so am I. Maybe we can be lost together for a while."`,
        `*${autoName} raises an eyebrow, clearly amused.* "Oh? And just what do you think you're doing in my territory? I'm not sure whether to be offended or impressed."`,
      ]);
    }
    setAutoLoading(false);
  };

  const inp = { width:"100%", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"11px 14px", color:C.text, fontSize:14, fontFamily:"inherit", display:"block", transition:"border-color .2s", marginTop:6 };

  return (
    <div style={{ padding:"15px 18px 32px",  }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:21, marginBottom:14, textAlign:"left" }}>{t.createChar}</div>

      {/* Tabs: Create / Import */}
      <div style={{ display:"flex", background:C.card, borderRadius:14, overflow:"hidden", border:`1px solid ${C.border}`, marginBottom:18 }}>
        {[["create","✦ Create"],["import","🔗 Import from link"]].map(([tab, label]) => (
          <button key={tab} onClick={()=>{ setActiveTab(tab); setImportError(""); setImportedChar(null); }} style={{ flex:1, padding:"10px 6px", fontSize:12, fontWeight:700, fontFamily:"inherit", color:activeTab===tab?C.bg:C.textMuted, background:activeTab===tab?C.mint:"transparent", transition:"all .2s", textAlign:"center" }}>{label}</button>
        ))}
      </div>

      {/* ── IMPORT TAB ── */}
      {activeTab === "import" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"rgba(126,207,179,.07)", border:`1px solid ${C.mintDim}`, borderRadius:14, padding:"12px 14px" }}>
            <div style={{ fontSize:12, color:C.mint, fontWeight:700, marginBottom:6 }}>Supported platforms</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Character.AI","Janitor AI","Chub.ai","NovelAI","Tavern","Pygmalion","Spicy Chat"].map(p => (
                <span key={p} style={{ fontSize:10, padding:"3px 9px", borderRadius:20, background:C.mintPale, color:C.mint, fontWeight:600 }}>{p}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize:12, color:C.text, fontWeight:600, marginBottom:6, textAlign:"left" }}>🔗 Paste character link or name</div>
            <textarea
              value={importUrl}
              onChange={e=>setImportUrl(e.target.value)}
              placeholder={"https://character.ai/chat/... \nor paste character name + description"}
              rows={3}
              style={{ ...inp, marginTop:0, resize:"none", lineHeight:1.5 }}
            />
          </div>

          <button onClick={handleImport} disabled={importing || !importUrl.trim()} style={{ width:"100%", background:importUrl.trim()?C.mint:"rgba(126,207,179,.3)", color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:14, padding:"13px 0", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:importing?0.7:1, cursor:importUrl.trim()?"pointer":"not-allowed" }}>
            {importing ? <><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>◌</span> Importing...</> : "✦ Import Character"}
          </button>

          {importError && (
            <div style={{ background:"rgba(224,124,124,.12)", border:`1px solid ${C.danger}`, borderRadius:12, padding:"10px 14px", fontSize:12, color:C.danger, lineHeight:1.5 }}>{importError}</div>
          )}

          {importedChar && (
            <div style={{ background:C.card, border:`1.5px solid ${C.mint}`, borderRadius:16, overflow:"hidden" }}>
              <div style={{ background:"#1a3d33", padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:36 }}>
                  {["🧝‍♀️","🕵️","🤖","⚔️","🌸","🌑","💻","🪶"][Math.floor(Math.random()*8)]}
                </span>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, color:C.mint }}>{importedChar.name}</div>
                  {importedChar.source && <div style={{ fontSize:10, color:C.mintDim, marginTop:2 }}>Imported from {importedChar.source}</div>}
                </div>
              </div>
              <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.6 }}>{importedChar.desc}</div>
                <div style={{ fontSize:11, color:C.textDim, lineHeight:1.5, fontStyle:"italic", borderLeft:`2px solid ${C.mintDim}`, paddingLeft:10 }}>{importedChar.firstMsg?.slice(0,120)}...</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:4 }}>
                  {(importedChar.tags||[]).map(tag => <span key={tag} className="pill">{tag}</span>)}
                </div>
                <div style={{ display:"flex", gap:8, marginTop:6 }}>
                  <button onClick={useImportedChar} style={{ flex:2, background:C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:13, padding:"11px 0", borderRadius:12 }}>▶ Start Roleplay</button>
                  <button onClick={()=>{ setName(importedChar.name); setDesc(importedChar.desc); setPersonality(importedChar.personality); setFirstMsg(importedChar.firstMsg); setTags((importedChar.tags||[]).join(", ")); setTone(importedChar.tone||"neutral"); setActiveTab("create"); }} style={{ flex:1, background:C.card, color:C.mint, fontFamily:"inherit", fontWeight:700, fontSize:12, padding:"11px 0", borderRadius:12, border:`1px solid ${C.mint}` }}>✏ Edit & Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CREATE TAB ── */}
      {activeTab === "create" && (
      <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
        <div style={{ width:"100%", background:C.card, border:`2px dashed ${C.border}`, borderRadius:16, height:86, display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:18, cursor:"pointer", fontSize:13, color:C.textMuted }}>
          <span style={{ fontSize:24, marginRight:8 }}>🖼</span>{t.charAvatar}
        </div>
        <Fld label={t.charName}><input value={name} onChange={e=>setName(e.target.value)} style={inp} /></Fld>
        <Fld label={t.charDesc}><input value={desc} onChange={e=>setDesc(e.target.value)} style={inp} /></Fld>
        <Fld label={t.charPersonality}><textarea value={personality} onChange={e=>setPersonality(e.target.value)} rows={4} style={{ ...inp, resize:"none", lineHeight:1.6 }} /></Fld>
        <Fld label={t.memory}>
          <textarea value={memory} onChange={e=>setMemory(e.target.value)} rows={3} placeholder={t.memoryHint} style={{ ...inp, resize:"none", lineHeight:1.6 }} />
          <div style={{ fontSize:11, color:C.textDim, marginTop:5, lineHeight:1.5 }}>💡 {lang==="ru"?"Персонаж всегда будет помнить это, без необходимости упоминать в роли.":"The character always remembers this — no need to mention it mid-roleplay."}</div>
        </Fld>
        <div style={{ background:C.mintPale, border:`1.5px solid ${C.mintDim}`, borderRadius:16, overflow:"hidden" }}>
          <button onClick={()=>setShowAuto(a=>!a)} style={{ width:"100%", padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"inherit", color:C.mint, fontWeight:700, fontSize:13, background:"transparent" }}>
            <span>✦ {lang==="ru"?"Автозаповнення першого повідомлення":"Autofill first message"}</span>
            <span style={{ fontSize:16, transform:showAuto?"rotate(180deg)":"none", transition:"transform .2s" }}>⌄</span>
          </button>
          {showAuto && (
            <div style={{ padding:"0 14px 16px", display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", gap:8 }}>
                <input value={autoName} onChange={e=>setAutoName(e.target.value)} placeholder={lang==="ru"?"Ім'я персонажа":"Character name"} style={{ ...inp, marginTop:0, flex:1 }} />
              </div>
              <div>
                <div style={{ fontSize:11, color:C.mint, fontWeight:600, marginBottom:6 }}>{lang==="ru"?"Жанр / тема":"Genre / theme"}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
                  {THEMES_PRESET.map(th=>(
                    <button key={th} onClick={()=>setAutoTheme(th)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontFamily:"inherit", fontWeight:600, color:autoTheme===th?C.bg:C.mint, background:autoTheme===th?C.mint:"rgba(126,207,179,.12)", border:`1px solid ${autoTheme===th?C.mint:C.mintDim}`, transition:"all .15s" }}>{th}</button>
                  ))}
                </div>
                <input value={autoTheme} onChange={e=>setAutoTheme(e.target.value)} placeholder={lang==="ru"?"або напиши свою тему...":"or type your own theme..."} style={{ ...inp, marginTop:0 }} />
              </div>
              <button onClick={generateOptions} disabled={autoLoading||!autoName.trim()} style={{ width:"100%", background:autoName.trim()?C.mint:"rgba(126,207,179,.3)", color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:13, padding:"11px 0", borderRadius:12, opacity:autoLoading?0.7:1, cursor:autoName.trim()?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                {autoLoading ? (<><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>◌</span> {lang==="ru"?"Генеруємо...":"Generating..."}</>) : (<>{lang==="ru"?"✦ Згенерувати 5 варіантів":"✦ Generate 5 options"}</>)}
              </button>
              {autoOptions.length>0 && (
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:4 }}>
                  <div style={{ fontSize:11, color:C.mint, fontWeight:700, letterSpacing:.4, textTransform:"uppercase" }}>{lang==="ru"?"Оберіть варіант:":"Pick an option:"}</div>
                  {autoOptions.map((opt, i)=>{
                    const icons=["🌑","💕","👁","🌸","🎭"];
                    const labels=lang==="ru"?["Загадковий","Романтичний","Домінантний","Ніжний","Грайливий"]:["Mysterious","Romantic","Dominant","Soft","Playful"];
                    return (
                      <div key={i} onClick={()=>{ setFirstMsg(opt); setShowAuto(false); }} style={{ background:"rgba(14,15,17,.7)", border:`1px solid ${C.border}`, borderRadius:14, padding:"12px 14px", cursor:"pointer", transition:"all .18s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.mint; e.currentTarget.style.background="rgba(126,207,179,.08)"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background="rgba(14,15,17,.7)"; }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                          <span style={{ fontSize:14 }}>{icons[i]}</span>
                          <span style={{ fontSize:10, color:C.mint, fontWeight:700, textTransform:"uppercase", letterSpacing:.4 }}>{labels[i]}</span>
                        </div>
                        <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.6 }}>{opt}</div>
                        <div style={{ fontSize:10, color:C.mintDim, marginTop:6, fontWeight:700 }}>↑ {lang==="ru"?"Натисни щоб вибрати":"Tap to use this"}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <Fld label={t.firstMsg}><textarea value={firstMsg} onChange={e=>setFirstMsg(e.target.value)} rows={3} style={{ ...inp, resize:"none", lineHeight:1.6 }} /></Fld>
        <Fld label={t.tags}><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="fantasy, romance, dark..." style={inp} /></Fld>
        <Fld label={t.responseSize}>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            {[["small","📝",t.small],["medium","📄",t.medium],["large","📜",t.large]].map(([val,icon,label])=>(
              <button key={val} onClick={()=>setSize(val)} style={{ flex:1, padding:"9px 4px", borderRadius:12, border:`1.5px solid ${size===val?C.mint:C.border}`, background:size===val?C.mintPale:C.card, color:size===val?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:700, fontSize:11, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><span style={{ fontSize:15 }}>{icon}</span>{label}</button>
            ))}
          </div>
        </Fld>
        <Fld label={t.censorship}>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            {[[true,"🛡",t.censorOn],[false,"🔥",t.censorOff]].map(([val,icon,label])=>(
              <button key={String(val)} onClick={()=>setCensor(val)} style={{ flex:1, padding:"9px 6px", borderRadius:12, border:`1.5px solid ${censor===val?C.mint:C.border}`, background:censor===val?C.mintPale:C.card, color:censor===val?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:700, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{icon} {label}</button>
            ))}
          </div>
        </Fld>
        <Fld label={t.toneLabel}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7, marginTop:6 }}>
            {TONES.map(tn=>(
              <button key={tn.id} onClick={()=>setTone(tn.id)} style={{ padding:"8px 4px", borderRadius:12, border:`1.5px solid ${tone===tn.id?C.mint:C.border}`, background:tone===tn.id?C.mintPale:C.card, color:tone===tn.id?C.mint:C.textMuted, fontFamily:"inherit", fontWeight:600, fontSize:10, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><span style={{ fontSize:16 }}>{tn.icon}</span>{lang==="ru"?tn.ru:tn.en}</button>
            ))}
          </div>
        </Fld>
        <Fld label={t.visibility}>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            {[["public","🌍",t.public],["followers","👥",t.followers],["private","🔒",t.private]].map(([val,icon,label])=>(
              <button key={val} onClick={()=>setVisibility(val)} style={{ flex:1, padding:"9px 4px", borderRadius:12, border:`1.5px solid ${visibility===val?C.mint:C.border}`, background:visibility===val?C.mintPale:C.card, color:visibility===val?C.mint:C.textMuted, fontFamily:"inherit", fontSize:10, fontWeight:700, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}><span style={{ fontSize:16 }}>{val==="public"?"🌍":val==="followers"?"👥":"🔒"}</span>{label}</button>
            ))}
          </div>
        </Fld>
        <div style={{ display:"flex", gap:10, marginTop:4 }}>
          <button onClick={()=>setSaved(true)} style={{ flex:1, padding:"11px", borderRadius:14, border:`1px solid ${C.border}`, background:C.card, color:C.textMuted, fontFamily:"inherit", fontWeight:600, fontSize:13 }}>{saved?"✓":t.save}</button>
          <button onClick={handlePublish} disabled={publishing} style={{ flex:2, padding:"11px", borderRadius:14, background:published?"#4a9e85":C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:14, opacity:publishing?0.7:1 }}>{publishing?"⏳...":published?"✓ Published!":t.publish}</button>
        </div>
      </div>
      )} {/* end create tab */}
    </div>
  );
}

// ─── CHATS PAGE ───────────────────────────────────────────────────────────────
function ChatsPage({ t, sessions, sessionsLoading, onContinue, onDelete, lang, isReg, onShowAuth }) {
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!isReg) return (
    <div style={{ padding:"14px 18px 24px",  }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:21, marginBottom:16 }}>{t.chats}</div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:"40px 6px", textAlign:"center" }}>
        <span style={{ fontSize:44 }}>💬</span>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:17 }}>Your chats live here</div>
        <div style={{ fontSize:13, color:C.textMuted, lineHeight:1.6 }}>Sign in to save every roleplay session and continue right where you left off — any time.</div>
        <button onClick={onShowAuth} style={{ background:C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:14, padding:"12px 28px", borderRadius:14 }}>Sign in to see chats</button>
      </div>
    </div>
  );

  if (sessionsLoading) return (
    <div style={{ padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"center", color:C.textMuted, gap:10, flex:1 }}>
      <span style={{ display:"inline-block", animation:"spin 1s linear infinite", fontSize:20 }}>◌</span>
      <span style={{ fontSize:13 }}>Loading chats...</span>
    </div>
  );

  if (!sessions.length) return (
    <div style={{ padding:"14px 18px 24px",  }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:21, marginBottom:16 }}>{t.chats}</div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12, padding:"40px 0" }}>
        <span style={{ fontSize:40 }}>💬</span>
        <span style={{ fontSize:14, color:C.textMuted }}>{t.noChats}</span>
      </div>
    </div>
  );

  return (
    <div style={{ padding:"14px 14px 24px",  }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:21, marginBottom:14 }}>{t.chats}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {sessions.map(session => {
          const chars = Array.isArray(session.chars) ? session.chars : [];
          const wp = WALLPAPERS.find(w => w.id === session.wallpaper) || WALLPAPERS[0];
          const tn = TONES.find(x => x.id === session.tone);
          const isRecent = session.last_used_at && (Date.now() - new Date(session.last_used_at).getTime()) < 1000 * 60 * 30;

          return (
            <div key={session.id} className="session-card" style={{ position:"relative" }}>
              {confirmDelete === session.id && (
                <div style={{ position:"absolute", inset:0, background:"rgba(14,15,17,.95)", borderRadius:16, zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, border:`1px solid ${C.danger}` }}>
                  <div style={{ fontSize:13, color:C.text, fontWeight:600 }}>Delete this chat?</div>
                  <div style={{ fontSize:11, color:C.textMuted }}>All messages will be lost forever.</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>{ onDelete(session.id); setConfirmDelete(null); }} style={{ background:C.danger, color:"#fff", borderRadius:10, padding:"7px 18px", fontFamily:"inherit", fontWeight:700, fontSize:12 }}>Delete</button>
                    <button onClick={()=>setConfirmDelete(null)} style={{ background:C.card, color:C.textMuted, borderRadius:10, padding:"7px 14px", border:`1px solid ${C.border}`, fontFamily:"inherit", fontSize:12 }}>Cancel</button>
                  </div>
                </div>
              )}

              <div onClick={() => onContinue(session)} style={{ background:C.card, border:`1.5px solid ${isRecent ? C.mintDim : C.border}`, borderRadius:16, padding:"13px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, transition:"all .18s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=C.cardHover; e.currentTarget.style.borderColor=C.mint; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=C.card; e.currentTarget.style.borderColor=isRecent?C.mintDim:C.border; }}>
                <div style={{ width:48, height:48, borderRadius:14, ...wp.css, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, position:"relative" }}>
                  {chars.map(c => c.avatar || c.avatar_emoji || "🌟").join("")}
                  {isRecent && (
                    <div style={{ position:"absolute", top:-3, right:-3, width:10, height:10, borderRadius:"50%", background:C.mint, border:`2px solid ${C.card}`, boxShadow:`0 0 6px ${C.mint}` }} />
                  )}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, marginBottom:3 }}>
                    {chars.map(c => c.name).join(", ")}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:11, color:isRecent ? C.mint : C.textMuted, display:"flex", alignItems:"center", gap:3 }}>
                      🕐 {timeAgo(session.last_used_at, lang)}
                    </span>
                    {tn && <span style={{ fontSize:11 }}>{tn.icon}</span>}
                    <span style={{ fontSize:11, color:C.textDim }}>{session.censorship ? "🛡" : "🔥"}</span>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:C.mint, background:C.mintPale, padding:"4px 10px", borderRadius:20 }}>
                    {t.continueChat} →
                  </div>
                  <button className="del-btn" onClick={e => { e.stopPropagation(); setConfirmDelete(session.id); }} style={{ fontSize:10, color:C.textDim, opacity:0, transition:"opacity .15s", padding:"2px 6px", borderRadius:6, background:"transparent" }}>🗑</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── LANG PICKER ──────────────────────────────────────────────────────────────
const LANG_FLAGS = {
  en: { flag:"🇬🇧", label:"English" },
  ru: { flag:"🇷🇺", label:"Русский" },
  uk: { flag:"🇺🇦", label:"Українська" },
  de: { flag:"🇩🇪", label:"Deutsch" },
  it: { flag:"🇮🇹", label:"Italiano" },
  fr: { flag:"🇫🇷", label:"Français" },
  es: { flag:"🇪🇸", label:"Español" },
  pl: { flag:"🇵🇱", label:"Polski" },
};

function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px", borderRadius:20, border:`1px solid ${C.border}`, background:C.card, cursor:"pointer", transition:"all .15s" }}>
        <span style={{ fontSize:18, lineHeight:1 }}>{LANG_FLAGS[lang]?.flag}</span>
        <span style={{ fontSize:11, color:C.textMuted, fontWeight:700, fontFamily:"inherit" }}>{lang.toUpperCase()}</span>
        <span style={{ fontSize:9, color:C.textDim, marginLeft:2 }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:6, zIndex:200, minWidth:160, boxShadow:"0 8px 32px rgba(0,0,0,.5)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
            {Object.entries(LANG_FLAGS).map(([code, info]) => (
              <button key={code} onClick={() => { setLang(code); setOpen(false); }} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 10px", borderRadius:10, border:`1px solid ${lang===code?C.mint:C.border}`, background:lang===code?C.mintPale:C.card, cursor:"pointer", transition:"all .12s", textAlign:"left" }}>
                <span style={{ fontSize:18, lineHeight:1 }}>{info.flag}</span>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:lang===code?C.mint:C.text, fontFamily:"inherit" }}>{code.toUpperCase()}</div>
                  <div style={{ fontSize:9, color:C.textDim, fontFamily:"inherit" }}>{info.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROLEPLAY TEXT RENDERER ───────────────────────────────────────────────────
function RoleText({ text, fontSize, lineHeight, isUser }) {
  if (!text) return null;
  const segments = [];
  const regex = /(\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push({ type: "speech", text: text.slice(lastIndex, match.index).trim() });
    segments.push({ type: "action", text: match[0].slice(1, -1).trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) { const rest = text.slice(lastIndex).trim(); if (rest) segments.push({ type: "speech", text: rest }); }
  const filtered = segments.filter(s => s.text.length > 0);
  return (
    <div style={{ fontSize, lineHeight, display:"flex", flexDirection:"column", gap: "6px" }}>
      {filtered.map((seg, i) => {
        const isAction = seg.type === "action";
        const showDash = i > 0 && !isAction && filtered[i-1]?.type === "action";
        const showDashBefore = i > 0 && isAction && filtered[i-1]?.type === "speech";
        return (
          <span key={i} style={{ display:"block" }}>
            {(showDash || showDashBefore) && (<span style={{ color: isUser ? "rgba(126,207,179,.4)" : "rgba(122,127,135,.35)", marginRight: 6, fontWeight:300 }}>—</span>)}
            {isAction ? (
              <span style={{ fontStyle:"italic", color: isUser ? "rgba(126,207,179,.65)" : "rgba(180,185,195,.55)", fontWeight:400, letterSpacing:"0.01em" }}>{seg.text}</span>
            ) : (
              <span style={{ color: isUser ? "#7ecfb3" : "#e8eaed", fontWeight:400 }}>
                {seg.text.replace(/^[""]|[""]$/g, "").trim() ? <>{i > 0 && !showDash && "— "}{seg.text.replace(/^[""]|[""]$/g, "").trim()}</> : seg.text}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── CHAT PAGE (з підтримкою кастомного фото фону) ────────────────────────────
function ChatPage({ t, chat, onSend, onBack, msgCount, isReg, editMessage, ts }) {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const bottomRef = useRef(null);
  const wp = WALLPAPERS.find(w=>w.id===chat.wallpaper)||WALLPAPERS[0];
  // Custom bg support
  const customBgStyle = chat.customBg
    ? { backgroundImage:`url(${chat.customBg})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat" }
    : {};
  const tn = TONES.find(x=>x.id===chat.tone);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[chat.messages]);
  const handleSend = () => { if(input.trim()){ onSend(input.trim()); setInput(""); } };
  const startEdit = (msg) => { setEditingId(msg.id); setEditText(msg.text); };
  const saveEdit  = () => { editMessage(chat.id, editingId, editText); setEditingId(null); };
  const chars = chat.chars || [];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", flex:1, ...wp.css, ...customBgStyle }}>
      <div style={{ padding:"11px 15px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10, background:"rgba(14,15,17,.88)", backdropFilter:"blur(10px)", flexShrink:0 }}>
        <button onClick={onBack} style={{ color:C.mint, fontSize:20, padding:"4px 8px 4px 0", lineHeight:1 }}>←</button>
        <div style={{ fontSize:24 }}>{chars.map(c=>c.avatar||c.avatar_emoji||"🌟").join(" ")}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>{chars.map(c=>c.name).join(", ")}</div>
          <div style={{ fontSize:10, color:C.mint, display:"flex", gap:5, flexWrap:"wrap" }}>
            <span>{t.online}</span><span>·</span>
            {tn && <span>{tn.icon} {tn.en}</span>}<span>·</span>
            <span>{chat.censorship?"🛡":"🔥"}</span><span>·</span>
            <span>{(chat.response_size||chat.responseSize)==="small"?"📝":(chat.response_size||chat.responseSize)==="large"?"📜":"📄"}</span>
          </div>
        </div>
        {!isReg && <div style={{ fontSize:10, color:C.textMuted, background:"rgba(28,30,33,.8)", padding:"3px 8px", borderRadius:20, border:`1px solid ${C.border}` }}>{Math.max(0,10-msgCount)} {t.messages}</div>}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"14px 13px", display:"flex", flexDirection:"column", gap:10 }}>
        {(!chat.messages || chat.messages.length===0) && (
          <div style={{ textAlign:"center", color:C.textMuted, fontSize:13, marginTop:40 }}>
            <div style={{ fontSize:38, marginBottom:10 }}>{chars[0]?.avatar||chars[0]?.avatar_emoji||"🌟"}</div>
            <div>Begin your story with <strong>{chars.map(c=>c.name).join(" & ")}</strong></div>
          </div>
        )}
        {(chat.messages || []).map(msg=>(
          <div key={msg.id} className="mb" style={{ display:"flex", flexDirection:msg.role==="user"?"row-reverse":"row", gap:8, alignItems:"flex-end" }}>
            {msg.role==="ai" && <span style={{ fontSize:21, flexShrink:0, lineHeight:1 }}>{msg.charAvatar}</span>}
            <div style={{ maxWidth:"80%" }}>
              {msg.role==="ai" && (
                <div style={{ fontSize:10, color:C.mint, fontWeight:700, marginBottom:3, paddingLeft:4, display:"flex", alignItems:"center", gap:6 }}>
                  {msg.charName}
                  {editingId!==msg.id && (<button onClick={()=>startEdit(msg)} style={{ fontSize:10, color:C.textDim, padding:"1px 7px", borderRadius:8, background:"rgba(28,30,33,.8)", border:`1px solid ${C.border}`, fontFamily:"inherit" }}>✏ {t.editMsg}</button>)}
                </div>
              )}
              {editingId===msg.id ? (
                <div>
                  <textarea value={editText} onChange={e=>setEditText(e.target.value)} rows={4} style={{ width:"100%", background:C.card, border:`1px solid ${C.mint}`, borderRadius:12, padding:"10px 12px", color:C.text, fontSize:13, fontFamily:"inherit", resize:"none", lineHeight:1.6 }} />
                  <div style={{ display:"flex", gap:6, marginTop:5 }}>
                    <button onClick={saveEdit} style={{ flex:1, background:C.mint, color:C.bg, borderRadius:10, padding:"7px 0", fontSize:12, fontFamily:"inherit", fontWeight:700 }}>Save</button>
                    <button onClick={()=>setEditingId(null)} style={{ flex:1, background:C.card, color:C.textMuted, borderRadius:10, padding:"7px 0", fontSize:12, fontFamily:"inherit", border:`1px solid ${C.border}` }}>Cancel</button>
                  </div>
                </div>
              ):(
                <div style={{ background:msg.role==="user"?"rgba(26,61,51,.88)":"rgba(28,30,33,.88)", border:`1px solid ${msg.role==="user"?C.mintDim:C.border}`, borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"10px 14px", backdropFilter:"blur(4px)" }}>
                  <RoleText text={msg.text} fontSize={(ts||{fontSize:13}).fontSize} lineHeight={(ts||{lineHeight:1.7}).lineHeight} isUser={msg.role==="user"} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding:"10px 13px 18px", background:"rgba(22,23,25,.95)", borderTop:`1px solid ${C.border}`, backdropFilter:"blur(10px)", flexShrink:0 }}>
        <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); handleSend(); } }} placeholder={t.typeMsg} rows={1} style={{ flex:1, background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:"11px 14px", color:C.text, fontSize:14, fontFamily:"inherit", resize:"none", lineHeight:1.5, transition:"border-color .2s", maxHeight:100 }} />
          <button onClick={handleSend} style={{ background:C.mint, color:C.bg, borderRadius:14, width:42, height:42, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH MODAL (з реєстрацією: ім'я, опис, фото) ────────────────────────────
function AuthModal({ t, C, onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPhoto, setAvatarPhoto] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const fileRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPhoto(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const em = email.trim();
    const pw = password;
    if (!em || !pw) { setError("Please fill in email and password."); return; }
    setError(""); setInfo(""); setLoading(true);
    try {
      if (mode === "register") {
        const { data, error: e } = await supabase.auth.signUp({ email: em, password: pw });
        if (e) { setError(e.message); setLoading(false); return; }
        const userId = data?.user?.id;
        if (userId) {
          // Upload avatar photo if chosen
          let photoUrl = null;
          if (avatarPhoto) {
            const ext = avatarPhoto.name.split(".").pop();
            const path = `${userId}/avatar.${ext}`;
            await supabase.storage.from("avatars").upload(path, avatarPhoto, { upsert: true });
            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
            photoUrl = urlData.publicUrl + "?t=" + Date.now();
          }
          // Save profile with name, bio, photo
          await supabase.from("profiles").upsert({
            id: userId,
            display_name: displayName.trim() || em.split("@")[0],
            bio: bio.trim(),
            avatar_emoji: "🌙",
            avatar_photo: photoUrl,
          });
        }
        setInfo("Check your email to confirm your account!");
      } else {
        const { data, error: e } = await supabase.auth.signInWithPassword({ email: em, password: pw });
        if (e) { setError(e.message); setLoading(false); return; }
        if (data?.user) onSuccess(data.user);
        else setError("Login failed. Please try again.");
      }
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  const inp = { width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 14px", color:C.text, fontSize:14, fontFamily:"inherit", marginBottom:10, transition:"border-color .2s" };

  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.82)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, zIndex:100, backdropFilter:"blur(8px)" }}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:22, padding:28, maxWidth:340, width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18 }}>{mode === "login" ? "Sign In" : "Create Account"}</div>
          <button onClick={onClose} style={{ color:C.textMuted, fontSize:22, lineHeight:1, padding:"2px 6px" }}>×</button>
        </div>

        {error && <div style={{ background:"rgba(224,124,124,.15)", border:"1px solid #e07c7c", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#e07c7c", marginBottom:12, lineHeight:1.5 }}>{error}</div>}
        {info  && <div style={{ background:"rgba(126,207,179,.15)", border:`1px solid ${C.mint}`, borderRadius:10, padding:"8px 12px", fontSize:12, color:C.mint, marginBottom:12, lineHeight:1.5 }}>{info}</div>}

        {/* Registration extras — показуються тільки при реєстрації */}
        {mode === "register" && (
          <>
            {/* Avatar photo upload */}
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display:"none" }} />
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ width:64, height:64, borderRadius:"50%", background:C.surface, border:`2px dashed ${C.mint}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", flexShrink:0, transition:"border-color .2s" }}
              >
                {avatarPreview
                  ? <img src={avatarPreview} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <span style={{ fontSize:26 }}>📷</span>}
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:C.mint, marginBottom:5 }}>Profile photo</div>
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{ fontSize:11, color:C.textMuted, fontFamily:"inherit", padding:"5px 12px", borderRadius:20, border:`1px solid ${C.border}`, background:C.surface, cursor:"pointer" }}
                >
                  {avatarPreview ? "Change photo" : "Upload photo"}
                </button>
                {avatarPreview && (
                  <button
                    onClick={() => { setAvatarPhoto(null); setAvatarPreview(null); }}
                    style={{ fontSize:11, color:C.danger, fontFamily:"inherit", padding:"5px 10px", borderRadius:20, border:"none", background:"transparent", cursor:"pointer", marginLeft:4 }}
                  >✕ Remove</button>
                )}
              </div>
            </div>

            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Display name (optional)"
              style={inp}
            />
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Short bio (optional)"
              rows={2}
              style={{ ...inp, resize:"none", lineHeight:1.5 }}
            />
          </>
        )}

        <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Email" type="email" autoComplete="email" style={inp} />
        <input value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Password" type="password" autoComplete={mode==="register"?"new-password":"current-password"} style={{ ...inp, marginBottom:16 }} />

        <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", background:loading?"rgba(126,207,179,.4)":C.mint, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:14, padding:"13px 0", borderRadius:14, marginBottom:10, cursor:loading?"not-allowed":"pointer", transition:"all .2s" }}>
          {loading ? "⏳ Loading..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <div style={{ textAlign:"center", fontSize:12, color:C.textMuted }}>
          {mode === "login" ? "No account? " : "Have an account? "}
          <button onClick={()=>{setMode(m=>m==="login"?"register":"login");setError("");setInfo("");setAvatarPhoto(null);setAvatarPreview(null);setDisplayName("");setBio("");}} style={{ color:C.mint, fontWeight:700, fontFamily:"inherit", fontSize:12 }}>
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
const AVATAR_EMOJIS = ["🌙","⭐","🌸","🔥","💎","🌊","🦋","🐉","🌿","✨","🎭","🗡️","🪐","🌑","💀","🦊","🐺","🌺","🎪","🔮"];

function ProfilePage({ t, isReg, setIsReg, profileTheme, setProfileTheme, pt, textScale, setTextScale, TEXT_SCALES, ts, lang, supaUser, onShowAuth, followed, likedChars, userProfile, setUserProfile, myCharsDB }) {
  const [activeTab, setActiveTab] = useState("chars");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile.displayName);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatarEmoji);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !supaUser) return;
    setUploadingPhoto(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${supaUser.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (upErr) { alert("Upload failed: " + upErr.message); setUploadingPhoto(false); return; }
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const url = data.publicUrl + "?t=" + Date.now();
      setUserProfile(prev => ({ ...prev, avatarPhoto: url }));
      if (supaUser) await supabase.from("profiles").upsert({ id: supaUser.id, avatar_photo: url });
    } catch { alert("Something went wrong."); }
    setUploadingPhoto(false);
  };

  const myPublicChars = (myCharsDB || []).filter(c => c.visibility === "public");
  const myPrivateChars = (myCharsDB || []).filter(c => c.visibility === "private");
  const myChars = [...myPublicChars, ...myPrivateChars];
  const likedCharsList = MOCK_CHARS.filter(c => likedChars.includes(c.id));
  const followedAuthors = [...new Set(MOCK_CHARS.map(c=>c.author))].filter(a => followed.includes(a));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsReg(false);
  };

  const saveProfile = async () => {
    setUserProfile(prev => ({ ...prev, displayName: editName, bio: editBio, avatarEmoji: editAvatar }));
    setEditingProfile(false);
    setShowAvatarPicker(false);
    if (!supaUser) return;
    await supabase.from("profiles").upsert({ id: supaUser.id, display_name: editName, bio: editBio, avatar_emoji: editAvatar });
  };

  const displayName = userProfile.displayName || supaUser?.email?.split("@")[0] || "You";
  const tabStyle = (id) => ({ flex:1, padding:"8px 4px", fontSize:10, fontWeight:700, fontFamily:"inherit", color:activeTab===id?pt.accent:C.textMuted, background:"transparent", borderBottom:`2px solid ${activeTab===id?pt.accent:"transparent"}`, textTransform:"uppercase", letterSpacing:.5, transition:"all .15s" });

  if (!isReg) return (
    <div style={{ background:pt.grad, padding:"14px 18px 32px" }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:21, marginBottom:16, color:pt.accent }}>{t.profile}</div>
      <div style={{ background:"rgba(28,30,33,.85)", border:`1px solid ${C.border}`, borderRadius:20, padding:24, textAlign:"center", backdropFilter:"blur(8px)" }}>
        <div style={{ fontSize:44, marginBottom:12 }}>✦</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:17, marginBottom:8 }}>Join IDK ai</div>
        <div style={{ color:C.textMuted, fontSize:13, marginBottom:20, lineHeight:1.6 }}>Create a free account to save characters, follow creators, and enjoy unlimited roleplay.</div>
        <button onClick={onShowAuth} style={{ width:"100%", background:pt.accent, color:C.bg, fontFamily:"inherit", fontWeight:800, fontSize:14, padding:"13px 0", borderRadius:14 }}>Create Account — it's free</button>
      </div>
    </div>
  );

  return (
    <div style={{ background:pt.grad }}>
      <div style={{ padding:"18px 18px 0", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:100, background:`linear-gradient(180deg, ${pt.accent}22 0%, transparent 100%)`, pointerEvents:"none" }} />
        <div style={{ position:"relative", display:"flex", alignItems:"flex-end", gap:14, marginBottom:14 }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:`rgba(255,255,255,.05)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, border:`3px solid ${pt.accent}`, boxShadow:`0 0 20px ${pt.accent}44`, overflow:"hidden" }}>
              {userProfile.avatarPhoto ? <img src={userProfile.avatarPhoto} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : userProfile.avatarEmoji}
            </div>
            {editingProfile && (
              <button onClick={()=>setShowAvatarPicker(s=>!s)} style={{ position:"absolute", bottom:0, right:0, background:pt.accent, borderRadius:"50%", width:22, height:22, fontSize:11, display:"flex", alignItems:"center", justifyContent:"center", color:C.bg }}>✏</button>
            )}
          </div>
          <div style={{ flex:1, paddingBottom:4 }}>
            {editingProfile ? (
              <input value={editName} onChange={e=>setEditName(e.target.value)} placeholder="Display name" style={{ background:"transparent", border:`1px solid ${pt.accent}`, borderRadius:8, padding:"4px 10px", color:C.text, fontSize:15, fontFamily:"'Syne',sans-serif", fontWeight:700, width:"100%", marginBottom:4 }} />
            ) : (
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16 }}>{displayName}</div>
            )}
            <div style={{ fontSize:11, color:pt.accent }}>{supaUser?.email}</div>
          </div>
          <div style={{ display:"flex", gap:6, paddingBottom:4 }}>
            {editingProfile ? (
              <>
                <button onClick={saveProfile} style={{ fontSize:11, color:C.bg, padding:"5px 12px", borderRadius:20, background:pt.accent, fontFamily:"inherit", fontWeight:700 }}>Save</button>
                <button onClick={()=>setEditingProfile(false)} style={{ fontSize:11, color:C.textMuted, padding:"5px 10px", borderRadius:20, border:`1px solid ${C.border}`, fontFamily:"inherit" }}>✕</button>
              </>
            ) : (
              <>
                <button onClick={()=>{ setEditName(userProfile.displayName); setEditBio(userProfile.bio); setEditAvatar(userProfile.avatarEmoji); setEditingProfile(true); }} style={{ fontSize:11, color:pt.accent, padding:"5px 12px", borderRadius:20, border:`1px solid ${pt.accent}`, fontFamily:"inherit", fontWeight:700 }}>✏ Edit</button>
                <button onClick={handleLogout} style={{ fontSize:11, color:C.danger, padding:"5px 10px", borderRadius:20, border:`1px solid ${C.danger}`, fontFamily:"inherit", fontWeight:700 }}>Exit</button>
              </>
            )}
          </div>
        </div>
        {showAvatarPicker && (
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:12, marginBottom:12 }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display:"none" }} />
            <button onClick={()=>fileInputRef.current?.click()} disabled={uploadingPhoto} style={{ width:"100%", marginBottom:10, padding:"10px", borderRadius:12, border:`1.5px dashed ${pt.accent}`, background:"transparent", color:pt.accent, fontFamily:"inherit", fontWeight:700, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer" }}>
              {uploadingPhoto ? "⏳ Uploading..." : "📷 Upload photo from gallery"}
            </button>
            {userProfile.avatarPhoto && (
              <button onClick={()=>{ setUserProfile(prev=>({...prev, avatarPhoto:null})); setShowAvatarPicker(false); }} style={{ width:"100%", marginBottom:10, padding:"8px", borderRadius:12, border:`1px solid ${C.danger}`, background:"transparent", color:C.danger, fontFamily:"inherit", fontSize:11, fontWeight:700 }}>
                🗑 Remove photo
              </button>
            )}
            <div style={{ fontSize:10, color:C.textMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:.4, marginBottom:8 }}>Or choose emoji</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
              {AVATAR_EMOJIS.map(em => (
                <button key={em} onClick={()=>{ setEditAvatar(em); setShowAvatarPicker(false); }} style={{ fontSize:26, width:44, height:44, borderRadius:12, border:`2px solid ${editAvatar===em?pt.accent:C.border}`, background:editAvatar===em?C.mintPale:C.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>{em}</button>
              ))}
            </div>
          </div>
        )}
        {editingProfile ? (
          <textarea value={editBio} onChange={e=>setEditBio(e.target.value)} placeholder="Write something about yourself..." rows={2} style={{ width:"100%", background:"rgba(28,30,33,.7)", border:`1px solid ${C.border}`, borderRadius:12, padding:"10px 12px", color:C.text, fontSize:12, fontFamily:"inherit", resize:"none", lineHeight:1.5, marginBottom:14 }} />
        ) : userProfile.bio ? (
          <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.6, marginBottom:14 }}>{userProfile.bio}</div>
        ) : null}
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          {[[myChars.length, "Characters"],[likedCharsList.length,"Liked"],[followedAuthors.length,"Following"],["∞","Messages"]].map(([val,label]) => (
            <div key={label} style={{ flex:1, background:"rgba(28,30,33,.7)", border:`1px solid ${C.border}`, borderRadius:14, padding:"10px 8px", textAlign:"center", backdropFilter:"blur(8px)" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18, color:pt.accent }}>{val}</div>
              <div style={{ fontSize:9, color:C.textMuted, marginTop:1, textTransform:"uppercase", letterSpacing:.4, fontWeight:600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, background:"rgba(14,15,17,.6)", backdropFilter:"blur(8px)", position:"sticky", top:0, zIndex:10 }}>
        <button style={tabStyle("chars")} onClick={()=>setActiveTab("chars")}>🎭 My Chars</button>
        <button style={tabStyle("liked")} onClick={()=>setActiveTab("liked")}>❤️ Liked</button>
        <button style={tabStyle("following")} onClick={()=>setActiveTab("following")}>👥 Following</button>
        <button style={tabStyle("settings")} onClick={()=>setActiveTab("settings")}>⚙️ Style</button>
      </div>
      <div style={{ padding:"14px 16px 32px" }}>
        {activeTab === "chars" && (
          <div>
            <div style={{ fontSize:11, color:pt.accent, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>🌍 Public · {myPublicChars.length}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
              {myPublicChars.map(char => <MiniCharCard key={char.id} char={char} pt={pt} />)}
            </div>
            <div style={{ fontSize:11, color:C.textMuted, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>🔒 Private · {myPrivateChars.length}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {myPrivateChars.map(char => <MiniCharCard key={char.id} char={char} pt={pt} isPrivate />)}
            </div>
            {myChars.length === 0 && <div style={{ textAlign:"center", color:C.textMuted, padding:"30px 0", fontSize:13 }}>No characters yet. Create your first!</div>}
          </div>
        )}
        {activeTab === "liked" && (
          <div>
            {likedCharsList.length === 0 ? (
              <div style={{ textAlign:"center", color:C.textMuted, padding:"30px 0", fontSize:13 }}><div style={{ fontSize:32, marginBottom:10 }}>🤍</div>No liked characters yet.</div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {likedCharsList.map(char => <MiniCharCard key={char.id} char={char} pt={pt} />)}
              </div>
            )}
          </div>
        )}
        {activeTab === "following" && (
          <div>
            {followedAuthors.length === 0 ? (
              <div style={{ textAlign:"center", color:C.textMuted, padding:"30px 0", fontSize:13 }}><div style={{ fontSize:32, marginBottom:10 }}>👥</div>Not following anyone yet.</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {followedAuthors.map(author => {
                  const authorChars = MOCK_CHARS.filter(c => c.author === author);
                  return (
                    <div key={author} style={{ background:"rgba(28,30,33,.85)", border:`1px solid ${C.border}`, borderRadius:16, padding:"12px 14px", backdropFilter:"blur(8px)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, border:`2px solid ${pt.accent}` }}>✦</div>
                        <div>
                          <div style={{ fontWeight:700, fontSize:13, color:pt.accent }}>@{author}</div>
                          <div style={{ fontSize:10, color:C.textMuted }}>{authorChars.length} characters</div>
                        </div>
                        <div style={{ marginLeft:"auto", fontSize:10, color:C.mint, padding:"3px 10px", borderRadius:20, background:C.mintPale, fontWeight:700 }}>✓ Following</div>
                      </div>
                      <div style={{ display:"flex", gap:6, overflowX:"auto" }}>
                        {authorChars.map(c => <div key={c.id} style={{ flexShrink:0, width:48, height:48, borderRadius:12, background:c.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, border:`1px solid ${C.border}` }}>{c.avatar}</div>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === "settings" && (
          <div>
            <div style={{ fontSize:11, color:C.textMuted, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>{t.profileStyle}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:20 }}>
              {PROFILE_THEMES.map(theme=>(
                <button key={theme.id} onClick={()=>setProfileTheme(theme.id)} style={{ padding:"10px 4px", borderRadius:12, border:`1.5px solid ${profileTheme===theme.id?theme.accent:C.border}`, background:profileTheme===theme.id?"rgba(255,255,255,.05)":C.card, color:profileTheme===theme.id?theme.accent:C.textMuted, fontFamily:"inherit", fontSize:11, fontWeight:700, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:theme.accent }} />{theme.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.textMuted, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", marginBottom:10 }}>Text size & response length</div>
            <div style={{ background:"rgba(28,30,33,.95)", border:`1px solid ${C.border}`, borderRadius:14, padding:"12px 14px", marginBottom:12, fontSize:ts.fontSize, lineHeight:ts.lineHeight, color:C.text }}>
              <span style={{ color:pt.accent, fontWeight:700, fontSize:ts.fontSize-1 }}>Aelindra{"  "}</span>
              <span style={{ fontStyle:"italic", color:C.textMuted }}>*turns slowly, eyes glinting.*</span>
              {" "}"You dare approach me?{(textScale==="lg"||textScale==="xl") ? " I haven't let anyone this close in a very long time." : ""}"
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {Object.entries(TEXT_SCALES).map(([key, val])=>(
                <button key={key} onClick={()=>setTextScale(key)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"10px 4px", borderRadius:12, border:`1.5px solid ${textScale===key?pt.accent:C.border}`, background:textScale===key?"rgba(255,255,255,.05)":C.card, color:textScale===key?pt.accent:C.textMuted, fontFamily:"inherit", fontWeight:700, transition:"all .15s" }}>
                  <span style={{ fontSize:val.fontSize, lineHeight:1 }}>Aa</span>
                  <span style={{ fontSize:10 }}>{val.label}</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.textDim, marginTop:8, textAlign:"center" }}>{ts.desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniCharCard({ char, pt, isPrivate }) {
  const avatar = char.avatar_emoji || char.avatar || "🌟";
  const color = char.avatar_color || char.color || "#2d4a3e";
  const desc = char.description || char.desc || "";
  return (
    <div style={{ background:"rgba(28,30,33,.85)", border:`1px solid ${isPrivate ? "#4a4f57" : C.border}`, borderRadius:14, overflow:"hidden", backdropFilter:"blur(8px)" }}>
      <div style={{ background:color, height:60, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, position:"relative" }}>
        {avatar}
        {isPrivate && <div style={{ position:"absolute", top:6, right:6, fontSize:10, background:"rgba(0,0,0,.6)", borderRadius:20, padding:"2px 6px" }}>🔒</div>}
      </div>
      <div style={{ padding:"8px 10px" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, marginBottom:2, color:isPrivate?C.textMuted:C.text }}>{char.name}</div>
        <div style={{ fontSize:10, color:C.textDim, lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{desc}</div>
      </div>
    </div>
  );
}

function Lbl({ children }) {
  return <div style={{ fontSize:11, color:C.mint, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", marginBottom:8, textAlign:"left" }}>{children}</div>;
}
function Fld({ label, children }) {
  return <div><label style={{ fontSize:11, color:C.mint, fontWeight:700, letterSpacing:.5, textTransform:"uppercase", display:"block", textAlign:"left" }}>{label}</label>{children}</div>;
}
