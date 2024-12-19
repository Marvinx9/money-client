import { Layout } from "@components/layout"
import { Breadcrumb } from "@components/types/Breadcrumb";
import { Children } from "@modules/dashboard/components/layout"
import { useVerifyIfHasProfileToAccessModule } from "@shared/hooks/profileValidations/useVerifyIfHasProfileToAccessModule";
import { SidebarButton } from "@shared/types/sidebarButton";
import { useEffect, useState } from "react";
import { FaHospitalUser, FaUserPlus } from "react-icons/fa6";
import { LuSearch, LuListOrdered } from "react-icons/lu";
import { MdPermCameraMic } from "react-icons/md";
import { useLocation } from "react-router-dom";

const FarmaciasLayout = ({ children }: Children) => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
        { label: "Acesso Farmacêutico", path: "/farmacias/selecao-beneficiario" },
    ]);
    const { execute } = useVerifyIfHasProfileToAccessModule();
    const SideBarButtonsFarmacias: SidebarButton[] = [
        {
            label: "Pesquisa de Beneficiário",
            path: "/farmacias/selecao-beneficiario",
            disabled: false,
            icon: <LuSearch />,
        },
        {
            label: "Teste de Áudio e Vídeo",
            path: "/farmacias/teste-telemedicina",
            disabled: false,
            icon: <MdPermCameraMic />,
        },
        {
            label: "Triagem do Beneficiário",
            path: "/farmacias/selecao-beneficiario/triagem",
            disabled: true,
            icon: <LuSearch />,
        },
        {
            label: "Fila de Atendimento",
            path: "/farmacias/fila-atendimento",
            disabled: false,
            icon: <LuListOrdered />,
        },
        {
            label: "Telemedicina",
            path: "/farmacias/telemedicina",
            disabled: true,
            icon: <LuListOrdered />,
        },
        {
            label: "Filial",
            path: "/farmacias/filial",
            disabled: !execute(["ACESSOFARMACIAGERENCIAMENTO"]),
            icon: <FaHospitalUser />,
        },
        {
            label: "Usuário",
            path: "/farmacias/usuario",
            disabled: !execute(["ACESSOFARMACIAGERENCIAMENTO"]),
            icon: <FaUserPlus />,
        },
    ];

    const handleBreadcrumbs = () => {
        const currentPath = location.pathname;
        if (currentPath === '/farmacias') return;

        for (const { label, path } of SideBarButtonsFarmacias) {
            if (
                path === currentPath &&
                !breadcrumbs.some((item) => item.label === label)
            ) {
                if (breadcrumbs.length > 1) {
                    setBreadcrumbs([breadcrumbs[0], { label, path }]);
                    return;
                }
                setBreadcrumbs([...breadcrumbs, { label, path }]);
            }
        }
    };

    useEffect(() => {
        handleBreadcrumbs();
    }, [location]);

    return (
        <Layout
            breadcrumbs={breadcrumbs}
            sidebarButton={SideBarButtonsFarmacias}
        >
            {children}
        </Layout>
    )
}

export { FarmaciasLayout }