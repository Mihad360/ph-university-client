import { useForm } from "react-hook-form";

const PHForm = ({onSubmit, children}) => {

    const {handleSubmit} = useForm()

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </div>
    );
};

export default PHForm;