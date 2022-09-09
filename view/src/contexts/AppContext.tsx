import { PanelType } from "../constants/app-options";
import React, { createContext, useState } from "react";

type Template = any;
interface IAppContext {
    isMobile: boolean | undefined;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    templates: Template[];
    setTemplates: (templates: Template[]) => void;
    uploads: any[];
    setUploads: (templates: any[]) => void;
    shapes: any[];
    setShapes: (templates: any[]) => void;
    activePanel: PanelType;
    setActivePanel: (option: PanelType) => void;
    activeSubMenu: string | null;
    setActiveSubMenu: (option: string) => void;
    currentTemplate: any;
    setCurrentTemplate: any;
    name: string | undefined | any;
    setName: (option: string) => void;
    email: string | undefined | any;
    setEmail: (option: string) => void;
    password: string | undefined | any;
    setPassword: (option: string) => void;
    visible: boolean | any;
    setVisible: (option: boolean | any) => void | any;
    invalidUser: boolean | any;
    setInvalidUser: (option: boolean | any) => void | any;
    token: string | any;
    setToken: (option: boolean | any) => void | any;
}

export const AppContext = createContext<IAppContext>({
    isMobile: false,
    setIsMobile: () => {},
    templates: [],
    setTemplates: () => {},
    uploads: [],
    setUploads: () => {},
    shapes: [],
    setShapes: () => {},
    activePanel: PanelType.TEMPLATES,
    setActivePanel: () => {},
    activeSubMenu: null,
    setActiveSubMenu: (value: string) => {},
    currentTemplate: {},
    setCurrentTemplate: {},
    name: '',
    setName: () => {},
    email: '',
    setEmail: () => {},
    password: '',
    setPassword: () => {},
    visible: false,
    setVisible: () => {},
    invalidUser: false,
    setInvalidUser: () => {},
    token: '',
    setToken: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [uploads, setUploads] = useState<any[]>([]);
    const [shapes, setShapes] = useState<Template[]>([]);
    const [activePanel, setActivePanel] = useState<PanelType>(PanelType.TEMPLATES);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState();
    const [invalidUser, setInvalidUser] = useState(false);
    const [token, setToken] = useState('');

    const context = {
        isMobile,
        setIsMobile,
        templates,
        setTemplates,
        activePanel,
        setActivePanel,
        shapes,
        setShapes,
        activeSubMenu,
        setActiveSubMenu,
        uploads,
        setUploads,
        currentTemplate,
        setCurrentTemplate,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        visible,
        setVisible,
        invalidUser,
        setInvalidUser,
        token,
        setToken
    };
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
