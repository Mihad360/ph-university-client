import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute role={undefined}>
        <MainLayout></MainLayout>
      </ProtectedRoute>
    </div>
  );
};

export default App;
