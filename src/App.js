/* REDUX */
import generateStore from "./redux/store";
import { Provider } from "react-redux";

/* REACT ROUTER DOM */
import { BrowserRouter,Routes,Route } from "react-router-dom";


/* IMAGES */
import stars from "./assets/images/stars.gif";
import error404 from "./assets/images/404Error.png";

/* COMPONENTS */
import { NavBar } from "./components/NavBar";
import { ContentPlanets } from "./components/ContentPlanets";
import { ContentPlanetsFavorites } from "./components/ContentPlanetsFavorites";


export default function App() {
  const store = generateStore();
  return (
    <>
      <BrowserRouter>
        {/* Proveemos a la aplicación el almacenamiento de reducers creado con redux enviandolo como props*/}
        <Provider store={store}>
          <header>
            <NavBar />
          </header>
          <main>
            <img src={stars} alt="stars" className="stars" />
            <Routes>
              <Route path="/favoritos" element={<ContentPlanetsFavorites />} />
              <Route path="/" element={<ContentPlanets />} />
              <Route path="*" element={<img src={error404} alt="Pagina no encontrada"/>}/>
            </Routes>
          </main>
        </Provider>
      </BrowserRouter>
    </>
  );
}
