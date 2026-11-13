/* ==========================================================
   Mahesh Deshmukh: Portfolio scripts (vanilla JS)
   ========================================================== */
(function () {
  "use strict";

  /* ---------- 1. LINKS: paste your real URLs here ----------
     Leave a value empty ("") until you have it. Buttons with an
     empty value show a friendly message instead of a broken link. */
  const LINKS = {
    email: "",            // e.g. "you@example.com"
    github: "",           // e.g. "https://github.com/your-username"
    linkedin: "",         // e.g. "https://www.linkedin.com/in/your-profile"
    projectLibrary: "",   // repo URL once the project is built
    projectStudent: ""    // repo URL once the project is built
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- 2. Toast helper ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  /* ---------- 3. Activate link buttons ---------- */
  $$("[data-link]").forEach((el) => {
    const key = el.dataset.link;
    const value = (LINKS[key] || "").trim();
    if (value) {
      el.href = key === "email" && !value.startsWith("mailto:") ? "mailto:" + value : value;
    } else {
      el.setAttribute("aria-disabled", "true");
      el.removeAttribute("target");
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("This link isn't added yet. Set it in the LINKS object in script.js.");
      });
    }
  });

  /* ---------- 4. Mobile navigation ---------- */
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- 5. OOP concepts data ---------- */
  const OOP = [
    {
      name: "Classes and Objects",
      def: "A class is a blueprint that describes data and behaviour. An object is a real instance created from that blueprint.",
      code: `class Student {
    String name;
    void introduce() {
        System.out.println("Hi, I'm " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();   // object
        s.name = "Mahesh";
        s.introduce();
    }
}`
    },
    {
      name: "Encapsulation",
      def: "Encapsulation keeps data private inside a class and exposes it only through public methods, so values can be validated and protected.",
      code: `class Account {
    private double balance;           // hidden data

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;   // validation
    }
}`
    },
    {
      name: "Inheritance",
      def: "Inheritance lets a child class reuse the fields and methods of a parent class and add its own, which reduces repeated code.",
      code: `class Person {
    String name = "Mahesh";
    void greet() { System.out.println("Hello, " + name); }
}

class Student extends Person {
    int year = 2;
    void showYear() { System.out.println("Year: " + year); }
}
// new Student() can call greet() and showYear()`
    },
    {
      name: "Polymorphism",
      def: "Polymorphism means one interface, many forms. A parent reference can hold child objects, and the correct overridden method runs at runtime.",
      code: `class Shape {
    double area() { return 0; }
}
class Circle extends Shape {
    double r = 2;
    @Override double area() { return Math.PI * r * r; }
}
class Square extends Shape {
    double s = 3;
    @Override double area() { return s * s; }
}
// Shape x = new Circle();  x.area() runs Circle's version`
    },
    {
      name: "Abstraction",
      def: "Abstraction hides implementation details and shows only what is essential. In Java it is achieved with abstract classes and interfaces.",
      code: `abstract class Vehicle {
    abstract void start();            // no body
    void stop() { System.out.println("Stopped"); }
}

class Car extends Vehicle {
    void start() { System.out.println("Car starts with a key"); }
}`
    },
    {
      name: "Constructors",
      def: "A constructor is a special method with the same name as the class. It runs when an object is created and sets its initial state.",
      code: `class Student {
    String name;
    int year;

    Student(String name, int year) {   // constructor
        this.name = name;
        this.year = year;
    }
}
// Student s = new Student("Mahesh", 2);`
    },
    {
      name: "Overloading and Overriding",
      def: "Overloading: same method name with different parameters in one class (compile time). Overriding: a child class replaces a parent method (runtime).",
      code: `class Calc {
    int add(int a, int b)        { return a + b; }
    double add(double a, double b) { return a + b; }  // overloading
}

class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override void sound() { System.out.println("Bark"); }  // overriding
}`
    }
  ];

  /* ---------- 6. OOP explorer (accessible tabs) ---------- */
  const tabsEl = $("#oopTabs");
  const panel = $("#oopPanel");
  const nameEl = $("#oopName"), defEl = $("#oopDef"), codeEl = $("#oopCode");
  const copyBtn = $("#copyBtn");
  let current = 0;

  // Minimal Java syntax highlighter (safe: escapes HTML first)
  function highlight(src) {
    const esc = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc
      .replace(/(\/\/.*)/g, '<span class="c">$1</span>')
      .replace(/("[^"]*")/g, '<span class="s">$1</span>')
      .replace(/\b(class|abstract|extends|public|private|static|void|int|double|new|return|if|this|String|@Override)\b/g, '<span class="k">$1</span>');
  }

  function select(i, focus) {
    current = i;
    $$("button", tabsEl).forEach((b, idx) => {
      const on = idx === i;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    const item = OOP[i];
    nameEl.textContent = item.name;
    defEl.textContent = item.def;
    codeEl.innerHTML = highlight(item.code);
    panel.classList.remove("swap");
    void panel.offsetWidth;           // restart animation
    panel.classList.add("swap");
    copyBtn.textContent = "Copy code";
  }

  OOP.forEach((item, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.role = "tab";
    b.textContent = item.name;
    b.addEventListener("click", () => select(i));
    tabsEl.appendChild(b);
  });

  // Arrow-key navigation between tabs
  tabsEl.addEventListener("keydown", (e) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    select((current + step + OOP.length) % OOP.length, true);
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(OOP[current].code);
      copyBtn.textContent = "Copied";
    } catch (_) {
      copyBtn.textContent = "Press Ctrl+C";
    }
  });
  select(0);

  /* ---------- 7. Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 8. Active nav link on scroll ---------- */
  const sections = $$("main section[id]");
  const navAnchors = $$("a", navLinks);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- 9. Back-to-top button ---------- */
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 500), { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 10. Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();