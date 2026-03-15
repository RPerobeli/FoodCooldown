import Header from "../components/Header/Header";
import { ResumeePanel } from "../components/Panels/ResumeePanel";
import FoodGrid from "../components/Grids/FoodGrid";
import { useFoods } from "../hooks/useUpdateFoods";


function Home() {
    const { foods, loading, refresh } = useFoods(); // Usando o hook

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col bg-[#242424] text-white justify-center items-center md:min-w-screen px-30 py-10">
            <div className = 'w-200 md:w-full'>
                <Header/>
                <ResumeePanel foodList={foods} />
                <FoodGrid foods={foods} onActionSuccess={refresh} />
            </div>
        </div>
    );
}
export default Home;