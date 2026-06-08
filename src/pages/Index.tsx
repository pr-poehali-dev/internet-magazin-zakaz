import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/d85781b8-49e0-4cad-a113-b5350173befc/files/baa220d4-2f1c-4d2f-8cac-fba5fb8ce2c2.jpg";
const CATALOG_IMG = "https://cdn.poehali.dev/projects/d85781b8-49e0-4cad-a113-b5350173befc/files/4f9e77fb-8545-4e5e-a6e5-d8e74c8bb523.jpg";
const BOUTIQUE_IMG = "https://cdn.poehali.dev/projects/d85781b8-49e0-4cad-a113-b5350173befc/files/bb8831fc-70d9-4e1b-b77d-28150cd38f5c.jpg";

const products = [
  { id: 1, name: "Парфюм «Nuit Éternelle»", category: "Парфюмерия", price: "28 500 ₽", img: CATALOG_IMG },
  { id: 2, name: "Браслет «Aurore»", category: "Украшения", price: "142 000 ₽", img: CATALOG_IMG },
  { id: 3, name: "Шёлковый платок", category: "Аксессуары", price: "19 800 ₽", img: CATALOG_IMG },
  { id: 4, name: "Часы «Minuit»", category: "Часы", price: "386 000 ₽", img: CATALOG_IMG },
  { id: 5, name: "Колье «Étoile»", category: "Украшения", price: "215 000 ₽", img: CATALOG_IMG },
  { id: 6, name: "Портмоне из крокодила", category: "Кожа", price: "67 000 ₽", img: CATALOG_IMG },
];

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О нас" },
  { id: "catalog", label: "Каталог" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "manager", text: "Добрый день! Рады приветствовать вас в Maison Noir. Чем могу помочь?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    setChatMessages((p) => [...p, { from: "user", text: inputValue }]);
    setInputValue("");
    setTimeout(() => {
      setChatMessages((p) => [
        ...p,
        { from: "manager", text: "Спасибо за ваш вопрос. Наш консультант свяжется с вами в течение нескольких минут." },
      ]);
    }, 1000);
  };

  const addToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-noir font-body overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-noir/95 backdrop-blur-sm border-b border-[rgba(201,169,110,0.15)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-display text-xl tracking-[0.3em] text-cream cursor-pointer" onClick={() => scrollTo("home")}>
            MAISON <span className="gold-text">NOIR</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <span
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button
              className="relative text-cream/70 hover:text-[#C9A96E] transition-colors"
              onClick={() => setChatOpen(true)}
            >
              <Icon name="MessageCircle" size={18} />
            </button>
            <button className="relative text-cream/70 hover:text-[#C9A96E] transition-colors">
              <Icon name="ShoppingBag" size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full gold-bg text-noir text-[9px] flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Mobile menu */}
            <button
              className="md:hidden text-cream/70 hover:text-[#C9A96E] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-noir border-t border-[rgba(201,169,110,0.15)] px-6 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <span
                key={item.id}
                className={`nav-link text-sm ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/60 to-noir" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="animate-fadeInUp animate-delay-1 font-body text-[0.65rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-6">
            Эксклюзивный Люкс-Бутик
          </p>
          <h1 className="animate-fadeInUp animate-delay-2 font-display text-6xl md:text-8xl lg:text-9xl font-light text-cream leading-none mb-4">
            MAISON
          </h1>
          <h1 className="animate-fadeInUp animate-delay-3 font-display text-6xl md:text-8xl lg:text-9xl font-light shimmer-text leading-none mb-10">
            NOIR
          </h1>
          <p className="animate-fadeInUp animate-delay-4 font-body text-sm tracking-widest text-cream/60 mb-12 font-light">
            Искусство роскоши в каждой детали
          </p>
          <div className="animate-fadeInUp animate-delay-5 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold" onClick={() => scrollTo("catalog")}>
              Изучить коллекцию
            </button>
            <button className="btn-outline-gold" onClick={() => scrollTo("about")}>
              О нашем доме
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C9A96E] mx-auto mb-2" />
          <Icon name="ChevronDown" size={14} className="text-[#C9A96E] mx-auto" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase gold-text mb-4">О нашем доме</p>
            <div className="section-divider mb-8" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream leading-tight mb-8">
              Традиции<br /><em>изысканности</em>
            </h2>
            <p className="text-cream/60 text-sm leading-relaxed mb-6 font-light">
              Maison Noir — это не просто магазин. Это пространство, где каждый предмет несёт в себе историю мастерства, передающегося из поколения в поколение. Мы отбираем только те вещи, которые превосходят время.
            </p>
            <p className="text-cream/60 text-sm leading-relaxed mb-10 font-light">
              Наша команда экспертов путешествует по всему миру в поисках редких экземпляров, созданных лучшими ювелирами, парфюмерами и кутюрье. Каждое изделие сопровождается сертификатом подлинности.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { num: "12+", label: "Лет опыта" },
                { num: "340+", label: "Брендов" },
                { num: "5 000+", label: "Клиентов" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center border-l border-[rgba(201,169,110,0.3)] pl-4">
                  <div className="font-display text-3xl gold-text mb-1">{num}</div>
                  <div className="font-body text-[0.6rem] tracking-widest uppercase text-cream/40">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={BOUTIQUE_IMG}
              alt="Boutique"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 border border-[rgba(201,169,110,0.3)] translate-x-4 translate-y-4 -z-10" />
            <div className="absolute -bottom-6 -left-6 bg-noir-soft border border-[rgba(201,169,110,0.3)] p-6">
              <div className="font-display text-4xl gold-text mb-1">I</div>
              <p className="font-body text-[0.6rem] tracking-widest uppercase text-cream/50">Качество<br />без компромиссов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase gold-text mb-4">Эксклюзивная коллекция</p>
            <div className="section-divider mx-auto mb-8" />
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Каталог изделий</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(201,169,110,0.1)]">
            {products.map((p) => (
              <div key={p.id} className="luxury-card group bg-[#0a0a0a] p-0 overflow-hidden">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button
                      className="btn-gold text-[0.6rem]"
                      onClick={() => addToCart(p.id)}
                    >
                      {addedId === p.id ? "✓ Добавлено" : "В корзину"}
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-body text-[0.55rem] tracking-[0.3em] uppercase gold-text mb-2">{p.category}</p>
                  <h3 className="font-display text-xl text-cream mb-3">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm gold-text font-medium">{p.price}</span>
                    <button
                      className="w-8 h-8 border border-[rgba(201,169,110,0.3)] flex items-center justify-center hover:border-[#C9A96E] hover:text-[#C9A96E] text-cream/40 transition-all"
                      onClick={() => addToCart(p.id)}
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-gold">Смотреть всю коллекцию</button>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase gold-text mb-4">Белые перчатки</p>
          <div className="section-divider mx-auto mb-8" />
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Доставка и сервис</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(201,169,110,0.1)]">
          {[
            { icon: "Package", title: "Фирменная упаковка", text: "Каждое изделие упаковывается в фирменные коробки с шёлковой лентой и именной открыткой." },
            { icon: "Truck", title: "Курьерская доставка", text: "Доставка до двери по всей России. Курьер в белых перчатках, страховка на всю стоимость." },
            { icon: "Globe", title: "Международная отправка", text: "Доставляем в 40+ стран мира. Таможенное оформление и полная документация включены." },
            { icon: "ShieldCheck", title: "Гарантия и возврат", text: "30 дней на возврат без объяснения причин. Пожизненная гарантия подлинности всех изделий." },
          ].map(({ icon, title, text }) => (
            <div key={title} className="bg-noir p-8 group hover:bg-noir-soft transition-colors">
              <div className="w-12 h-12 border border-[rgba(201,169,110,0.3)] flex items-center justify-center mb-6 group-hover:border-[#C9A96E] transition-colors">
                <Icon name={icon} size={20} className="gold-text" />
              </div>
              <h3 className="font-display text-xl text-cream mb-3">{title}</h3>
              <p className="text-cream/50 text-xs leading-relaxed font-light">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-[rgba(201,169,110,0.2)] p-10 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl text-cream mb-3">Персональный консьерж</h3>
            <p className="text-cream/50 text-sm font-light leading-relaxed">
              Закажите звонок персонального консьержа для подбора подарка или особого приобретения. Мы поможем выбрать идеальное изделие с учётом всех ваших пожеланий.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <button className="btn-gold" onClick={() => setChatOpen(true)}>
              Связаться с консьержем
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase gold-text mb-4">Свяжитесь с нами</p>
            <div className="section-divider mb-8" />
            <h2 className="font-display text-5xl font-light text-cream mb-10">Контакты</h2>

            <div className="space-y-8">
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, Кутузовский проспект, 12" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@maisonnoir.ru" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00 – 21:00\nВс: 11:00 – 20:00" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-5 items-start">
                  <div className="w-10 h-10 border border-[rgba(201,169,110,0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={icon} size={16} className="gold-text" />
                  </div>
                  <div>
                    <p className="font-body text-[0.6rem] tracking-widest uppercase text-cream/40 mb-1">{label}</p>
                    <p className="text-cream/80 text-sm font-light whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-display text-2xl text-cream mb-6">Оставить заявку</h3>
              {[
                { placeholder: "Ваше имя", type: "text" },
                { placeholder: "Электронная почта", type: "email" },
                { placeholder: "Телефон", type: "tel" },
              ].map(({ placeholder, type }) => (
                <input
                  key={placeholder}
                  type={type}
                  placeholder={placeholder}
                  className="w-full bg-transparent border border-[rgba(201,169,110,0.2)] px-5 py-4 text-cream/80 text-sm placeholder-cream/30 focus:outline-none focus:border-[#C9A96E] transition-colors font-light"
                />
              ))}
              <textarea
                placeholder="Ваше сообщение или вопрос"
                rows={4}
                className="w-full bg-transparent border border-[rgba(201,169,110,0.2)] px-5 py-4 text-cream/80 text-sm placeholder-cream/30 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none font-light"
              />
              <button type="submit" className="btn-gold w-full">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(201,169,110,0.15)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-lg tracking-[0.3em] text-cream">
            MAISON <span className="gold-text">NOIR</span>
          </div>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <span
                key={item.id}
                className="nav-link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
          </div>
          <p className="font-body text-[0.6rem] text-cream/30 tracking-widest">
            © 2024 MAISON NOIR
          </p>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="mb-4 w-80 bg-noir-soft border border-[rgba(201,169,110,0.3)] shadow-2xl animate-fadeInUp">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(201,169,110,0.2)] gold-bg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-noir flex items-center justify-center">
                  <Icon name="MessageCircle" size={16} className="text-[#C9A96E]" />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-noir tracking-widest uppercase">Консьерж-сервис</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-800" />
                    <span className="text-[0.6rem] text-noir/60">Онлайн</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-noir/60 hover:text-noir">
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-xs leading-relaxed font-light ${
                      msg.from === "user"
                        ? "gold-bg text-noir"
                        : "bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)] text-cream/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[rgba(201,169,110,0.2)] flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ваш вопрос..."
                className="flex-1 bg-transparent border border-[rgba(201,169,110,0.2)] px-3 py-2 text-xs text-cream/80 placeholder-cream/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 gold-bg flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Icon name="Send" size={14} className="text-noir" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="ml-auto flex items-center justify-center w-14 h-14 gold-bg shadow-lg hover:shadow-[0_8px_30px_rgba(201,169,110,0.5)] transition-all hover:scale-105"
        >
          <Icon name={chatOpen ? "X" : "MessageCircle"} size={22} className="text-noir" />
        </button>
      </div>
    </div>
  );
}