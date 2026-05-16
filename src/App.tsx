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

const initialProjects = [

  {

    id: 1,

    title: "Автоматизация роботизированной линии сборки",

    customer: "ГК Росатом",

    customerLogo: customerLogo,

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

    customerLogo: customerLogo,

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

    customerLogo: customerLogo,

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

function Home({ projects,loads }: any) {

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

          <LoadIndicator title="Загрузка сотрудников" value={loads.employees} />

          <LoadIndicator title="Загрузка вычислений" value={loads.computing} />

        </div>

      </header>

      <main className="projects">

        {projects

          .sort((a: any, b: any) => a.id - b.id)

          .map((project: any) => (

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

                    {project.customerLogo &&(
                      <img
                      src={project.customerLogo}
                      alt="Логотип заказчика"
                      />
                      )}

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

function ProjectPage({ projects }: any) {

  const { id } = useParams();

  const project = projects.find((p: any) => p.id === Number(id));

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

        <div className="project-info">

          <h1>{project.title}</h1>

          <div className="customer-row">

            {project.customerLogo &&(
              <img
              src={project.customerLogo}
              alt="Логотип заказчика"
              />
            )}

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

            {project.employees.map((e: string, i: number) => (

              <li key={i}>{e}</li>

            ))}

          </ul>

          <h3>Задачи</h3>

          <ul className="tasks-simple">

            {project.tasks.map((task: any, i: number) => (

              <li key={i}>

                {task.name}

              </li>

            ))}

          </ul>

          <h3>Галерея</h3>

          <div className="gallery">

            {project.gallery.map((img: string, i: number) => (

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

function AdminPage({ projects, setProjects, loads, setLoads}: any) {

  const [editingProject, setEditingProject] = useState<any | null>(null);

  function fileToBase64(file: File) {

    return new Promise<string>((resolve) => {

      const reader = new FileReader();

      reader.onload = () => {

        resolve(reader.result as string);

      };

      reader.readAsDataURL(file);

    });

  }

  async function changeMainImage(file: File | null) {

    if (!file || !editingProject) return;

    const image = await fileToBase64(file);

    setEditingProject({

      ...editingProject,

      image: image,

    });

  }

  async function changeCustomerLogo(file: File | null) {

    if (!file || !editingProject) return;

    const logo = await fileToBase64(file);

    setEditingProject({

      ...editingProject,

      customerLogo: logo,

    });

  }

  async function addGalleryImages(files: FileList | null) {

    if (!files || !editingProject) return;

    const images = await Promise.all(

      Array.from(files).map((file) => fileToBase64(file))

    );

    setEditingProject({

      ...editingProject,

      gallery: [...editingProject.gallery, ...images],

    });

  }


  function addNewProject() {

    setEditingProject({

      id: Date.now(),

      title: "",

      customer: "",

      customerLogo: "",

      department: "",

      startDate: "",

      endDate: "",

      progress: 0,

      price: "",

      image: "",

      description: "",

      employees: [],

      tasks: [],

      gallery: [],

    });

  }

  function saveProject() {

    if (!editingProject) return;

    const exists = projects.some((p: any) => p.id === editingProject.id);

    if (exists) {

      setProjects(

        projects.map((p: any) =>

          p.id === editingProject.id ? editingProject : p

        )

      );

    } else {

      setProjects([...projects, editingProject]);

    }

    setEditingProject(null);

  }

  function deleteProject(id: number) {

    setProjects(projects.filter((p: any) => p.id !== id));

  }

  return (

    <div className="app">

      <Link to="/" className="back-link">← На главную</Link>

      <div className="project-page">

        <div className="project-info">

          <h1>Панель администратора</h1>

          <h3>Загрузка системы</h3>
          <div className="admin-form">
            <label>Загрузка сотрудников, %</label>
            <input
            type="number"
            min="0"
            max="100"
            value={loads.employees}
            onChange={(e) =>
              setLoads({
                ...loads,
              employees: Number(e.target.value),
            })
          }
          />
          <label>Загрузка вычислений, %</label>
            <input
            type="number"
            min="0"
            max="100"
            value={loads.computing}
            onChange={(e) =>
              setLoads({
                ...loads,
                computing: Number(e.target.value),
              })
            }
            />
          </div>

          <button className="admin-button" onClick={addNewProject}>

            Добавить новый проект

          </button>

          <h3>Проекты</h3>

          <div className="admin-list">

            {projects

              .sort((a: any, b: any) => a.id - b.id)

              .map((project: any) => (

                <div className="admin-item" key={project.id}>

                  <div>

                    <b>{project.title}</b>

                  </div>

                  <div>

                    {project.customer || "Без заказчика"}

                  </div>

                  <div>

                    Прогресс: {project.progress}%

                  </div>

                  <button onClick={() => setEditingProject(project)}>

                    Редактировать

                  </button>

                  <button

                    className="danger-button"

                    onClick={() => deleteProject(project.id)}

                  >

                    Удалить

                  </button>

                </div>

              ))}

          </div>

          {editingProject && (

            <div className="admin-form">

              <h3>Редактирование проекта</h3>

              <label>Название проекта</label>

              <input

                value={editingProject.title}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, title: e.target.value })

                }

              />

              <label>Заказчик</label>

              <input

                value={editingProject.customer}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, customer: e.target.value })

                }

              />

              <label>Логотип заказчика</label>
              {editingProject.customerLogo && (
                <div className="admin-gallery-item">
                  <img src={editingProject.customerLogo} alt="Логотип заказчика" />
                  <button
                  type="button"
                  className="danger-button"
                  onClick={() =>
                    setEditingProject({
                      ...editingProject,
                      customerLogo: "",
                    })
                  }
                  >
                    Удалить логотип
                    </button>
                    </div>
                  )}

              <input

                type="file"

                accept="image/*"

                onChange={(e) => changeCustomerLogo(e.target.files?.[0] || null)}

              />

              <label>Отдел</label>

              <input

                value={editingProject.department}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, department: e.target.value })

                }

              />

              <label>Дата начала</label>

              <input

                value={editingProject.startDate}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, startDate: e.target.value })

                }

              />

              <label>Дата окончания</label>

              <input

                value={editingProject.endDate}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, endDate: e.target.value })

                }

              />

              <label>Прогресс</label>

              <input

                type="number"

                min="0"

                max="100"

                value={editingProject.progress}

                onChange={(e) =>

                  setEditingProject({

                    ...editingProject,

                    progress: Number(e.target.value),

                  })

                }

              />

              <label>Стоимость</label>

              <input

                value={editingProject.price}

                onChange={(e) =>

                  setEditingProject({ ...editingProject, price: e.target.value })

                }

              />

              <label>Описание</label>

              <textarea

                value={editingProject.description}

                onChange={(e) =>

                  setEditingProject({

                    ...editingProject,

                    description: e.target.value,

                  })

                }

              />

              <label>Основная фотография карточки</label>
              {editingProject.image && (
                <div className="admin-gallery-item">
                  <img src={editingProject.image} alt="Основная фотография" />
                  <button
                  type="button"
                  className="danger-button"
                  onClick={() =>
                    setEditingProject({
                      ...editingProject,
                      image: "",
                    })
                  }
                  >
                    Удалить основную фотографию
                    </button>
                    </div>
                )}

              <input

                type="file"

                accept="image/*"

                onChange={(e) => changeMainImage(e.target.files?.[0] || null)}

              />

              <label>Фотографии для галереи</label>

              <input

                type="file"

                accept="image/*"

                multiple

                onChange={(e) => addGalleryImages(e.target.files)}

              />

              <div className="admin-gallery-preview">

                {editingProject.gallery.map((img: string, i: number) => (

                  <div className="admin-gallery-item" key={i}>

                    <img src={img} alt={`Фото ${i + 1}`} />

                    <button

                      type="button"

                      className="danger-button"

                      onClick={() =>

                        setEditingProject({

                          ...editingProject,

                          gallery: editingProject.gallery.filter(

                            (_: string, index: number) => index !== i

                          ),

                        })

                      }

                    >

                      Удалить фото

                    </button>

                  </div>

                ))}

              </div>


              <label>Сотрудники</label>

              <textarea

                value={editingProject.employees.join("\n")}

                onChange={(e) =>

                  setEditingProject({

                    ...editingProject,

                    employees: e.target.value.split("\n"),

                  })

                }

              />

              <label>Задачи</label>

              <textarea

                value={editingProject.tasks.map((task: any) => task.name).join("\n")}

                onChange={(e) =>

                  setEditingProject({

                    ...editingProject,

                    tasks: e.target.value

                      .split("\n")

                      .map((name) => ({ name, progress: 0 })),

                  })

                }

              />

              <div className="admin-form-buttons">

                <button className="admin-button" onClick={saveProject}>

                  Сохранить

                </button>

                <button

                  className="secondary-button"

                  onClick={() => setEditingProject(null)}

                >

                  Отмена

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

function App() {

  const [projects, setProjects] = useState(() => {

    const savedProjects = localStorage.getItem("projects");

    // if (savedProjects) {

    //   return JSON.parse(savedProjects);

    // }
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      return parsedProjects.map((project: any) => {
        if (
          project.customer === "ГК Росатом" &&
          !project.customerLogo
        ) {
          return {
            ...project,
            customerLogo: customerLogo,
          };
        }
        return project;
      });
    }

    return initialProjects;

  });

  const [loads, setLoads] = useState(() => {
    const savedLoads = localStorage.getItem("loads");
    if (savedLoads) {
      return JSON.parse(savedLoads);
    }
    return {
      employees: 85,
      computing: 70,
    };
  });
  
  useEffect(() => {
    localStorage.setItem("loads", JSON.stringify(loads));
  }, [loads]);

  useEffect(() => {

    localStorage.setItem("projects", JSON.stringify(projects));

  }, [projects]);

  return (

    <Routes>

      <Route path="/" element={<Home projects={projects} loads={loads}/>} />

      <Route path="/project/:id" element={<ProjectPage projects={projects} />} />

      <Route

        path="/admin"

        element={<AdminPage 
          projects={projects} 
          setProjects={setProjects} 
          loads={loads}
          setLoads={setLoads}
          />
        }

      />

    </Routes>

  );

}

export default App;
