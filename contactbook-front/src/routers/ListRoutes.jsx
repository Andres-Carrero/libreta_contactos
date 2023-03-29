import { HomePage } from "../pages/home/HomePage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ContactsForm } from "../pages/contacts/form/ContactsForm";

export const ListRoutes = [
    {
        path: "",
        element: <DashboardPage />,
    },
    {
        path: "form",
        element: <ContactsForm />,
    },
    {
        path: "form/:uuid",
        element: <ContactsForm />,
    },


    
];