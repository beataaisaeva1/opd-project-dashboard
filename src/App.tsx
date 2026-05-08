import "./App.css";

import { useEffect, useState } from "react";

import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";

import img1 from "./assets/project1.jpg";

import img2 from "./assets/project2.jpg";

import img3 from "./assets/project3.jpg";

import robot1 from "./assets/robot1.jpg";

import robot2 from "./assets/robot2.jpg";

import equipment1 from "./assets/equipment1.jpg";

import equipment2 from "./assets/equipment2.jpg";

import digital1 from "./assets/digital1.jpg";

import digital2 from "./assets/digital2.jpg";

import cmlLogo from "./assets/ourLogo.png";

import customerLogo from "./assets/logo.png";

const projects = [

  {

    id: 1,

    title: "Автоматизация роботизированной линии сборки",

    customer: "ГК Росатом",

    department: "Отдел промышленной робототехники",

    startDate: "01.01.2024",

    endDate: "01.01.2025",

    progress: 75,

    price: "10 000 000 ₽",

    image: img1,

    description:

      "Проект по автоматизации сборочной линии с использованием промышленных роботов.",

    employees: ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."],

    tasks: [

      { name: "Проектирование линии", progress: 100 },

      { name: "Настройка роботов", progress: 70 },

      { name: "Тестирование сборки", progress: 40 },

    ],

    gallery: [robot1, robot2],

  },

  {

    id: 2,

    title: "Модернизация технологического оборудования завода",

    customer: "ГК Росатом",

    department: "Инженерный центр CML",

    startDate: "15.02.2024",

    endDate: "20.12.2024",

    progress: 45,

    price: "7 500 000 ₽",

    image: img2,

    description: "Обновление и модернизация оборудования на производственном заводе.",

    employees: ["Кузнецов А.А.", "Смирнова Е.Е.", "Федоров В.В."],

    tasks: [

      { name: "Обследование оборудования", progress: 100 },

      { name: "Замена узлов", progress: 50 },

      { name: "Пусконаладочные работы", progress: 20 },

    ],

    gallery: [equipment1, equipment2],

  },

  {

    id: 3,

    title: "Разработка цифровой системы мониторинга",

    customer: "ГК Росатом",

    department: "Отдел цифровых решений",

    startDate: "10.03.2024",

    endDate: "01.03.2025",

    progress: 90,

    price: "12 000 000 ₽",

    image: img3,

    description:

      "Создание системы мониторинга для отслеживания производственных процессов в реальном времени.",

    employees: ["Попов Д.Д.", "Алексеева Л.Л.", "Морозов К.К."],

    tasks: [

      { name: "Разработка интерфейса", progress: 100 },

      { name: "Подключение датчиков", progress: 80 },

      { name: "Тестирование системы", progress: 60 },

    ],

    gallery: [digital1, digital2],

  },

];

function LoadIndicator({

  title,

  value,

}: {

  title: string;

  value: number;

}) {

  return (

    <div className="load-indicator">

      <span>{title}</span>

      <b>{value}%</b>

      <div className="load-bar">

        <div style={{ width: `${value}%` }} />

      </div>

    </div>

  );

}

function Home() {

  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setNow(new Date());

      console.log("Данные обновлены");

    }, 60000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="app">

      <header className="header">

        <div className="header-left">

          <img src={cmlLogo} alt="CML" className="header-logo" />

          <div>

            <h1>Панель проектов</h1>

            <p>{now.toLocaleDateString()} {now.toLocaleTimeString()}</p>

          </div>

        </div>

        <div className="header-indicators">

          <LoadIndicator title="Загрузка сотрудников" value={85} />

          <LoadIndicator title="Загрузка вычислений" value={70} />

        </div>

      </header>

      <main className="projects">

        {projects

          .sort((a, b) => a.id - b.id)

          .map((project) => (

            <div


              className="card"

              key={project.id}

              onClick={() => navigate(`/project/${project.id}`)}

            >

              {project.image && (

                <img className="card-image" src={project.image} alt={project.title} />

              )}

              <div className="card-content">

                <h3>{project.title}</h3>

                {project.customer && (

                  <div className="customer-row">

                    <img src={customerLogo} alt="Логотип заказчика" />

                    <span>{project.customer}</span>

                  </div>

                )}

                {project.department && <p>{project.department}</p>}

                <div className="progress-line">

                  <div

                    className={project.progress === 100 ? "green" : "blue"}

                    style={{ width: `${project.progress}%` }}

                  />

                </div>

                <p>Прогресс: {project.progress}%</p>

                <p>Начало: {project.startDate}</p>

                <p>Конец: {project.endDate}</p>

                <p>Стоимость: {project.price}</p>

              </div>

            </div>

          ))}

      </main>

    </div>

  );

}

function ProjectPage() {

  const { id } = useParams();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <h1>Проект не найден</h1>;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (selectedImageIndex === null) return;

      if (event.key === "ArrowRight") {

        setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);

      }

      if (event.key === "ArrowLeft") {

        setSelectedImageIndex(

          selectedImageIndex === 0

            ? project.gallery.length - 1

            : selectedImageIndex - 1

        );

      }

      if (event.key === "Escape") {

        setSelectedImageIndex(null);

      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {

      window.removeEventListener("keydown", handleKeyDown);

    };

  }, [selectedImageIndex, project.gallery.length]);

  if (!project) return <h1>Проект не найден</h1>;

  return (

    <div className="app">

      <Link to="/" className="back-link">← На главную</Link>

      <div className="project-page">

        <img className="project-main-image" src={project.image} alt={project.title} />

        <div className="project-info">

          <h1>{project.title}</h1>

          <div className="customer-row">

            <img src={customerLogo} alt="Логотип заказчика" />

            <span>{project.customer}</span>

          </div>

          <p><b>Отдел:</b> {project.department}</p>

          <p><b>Дата начала:</b> {project.startDate}</p>

          <p><b>Дата окончания:</b> {project.endDate}</p>

          <p><b>Стоимость:</b> {project.price}</p>

          <div className="progress-line">

            <div

              className={project.progress === 100 ? "green" : "blue"}

              style={{ width: `${project.progress}%` }}

            />

          </div>

          <p><b>Прогресс:</b> {project.progress}%</p>

          <h3>Описание</h3>

          <p>{project.description}</p>

          <h3>Сотрудники</h3>

          <ul>

            {project.employees.map((e, i) => (

              <li key={i}>{e}</li>

            ))}

          </ul>

          <h3>Задачи</h3>

          <ul className="tasks-simple">

            {project.tasks.map((task, i) => (

              <li key={i}>

                {task.name}

              </li>

            ))}

          </ul>

          <h3>Галерея</h3>

          <div className="gallery">

            {project.gallery.map((img, i) => (

              <img

                key={i}

                src={img}

                alt={`Фото ${i + 1}`}

                onClick={() => setSelectedImageIndex(i)}

              />

            ))}

          </div>

        </div>

      </div>

      {selectedImageIndex !== null && (

        <div className="modal" onClick={() => setSelectedImageIndex(null)}>

          <button

            className="modal-arrow modal-arrow-left"

            onClick={(event) => {

              event.stopPropagation();

              setSelectedImageIndex(

                selectedImageIndex === 0

                  ? project.gallery.length - 1

                  : selectedImageIndex - 1

              );

            }}

          >

            ‹

          </button>

          <img

            src={project.gallery[selectedImageIndex]}

            alt="Просмотр"

            onClick={(event) => event.stopPropagation()}

          />

          <button

            className="modal-arrow modal-arrow-right"

            onClick={(event) => {

              event.stopPropagation();

              setSelectedImageIndex(

                (selectedImageIndex + 1) % project.gallery.length

              );

            }}

          >

            ›

          </button>

        </div>

      )}

    </div>

  );

}

function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/project/:id" element={<ProjectPage />} />

    </Routes>

  );

}

export default App;
