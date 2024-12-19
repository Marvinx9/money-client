import { useState, useRef, useCallback, createContext, ReactNode, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import OT, { Session } from "@opentok/client";
import { useNavigate } from "react-router-dom";

type Credentials = {
	session_id: string;
	paciente_token: string;
}

type TelemedicinaContextProps = {
	createSession: () => Promise<unknown>;
	destroySession: () => void;
	session: Session | null;
	connected: boolean;
	setCredentials: Dispatch<SetStateAction<Credentials>>;
}

type TelemedicinaProviderProps = {
	children: ReactNode;
}

const TelemedicinaContext = createContext<TelemedicinaContextProps>({} as TelemedicinaContextProps);

const TelemedicinaContextProvider = ({ children }: TelemedicinaProviderProps) => {
	const [connected, setConnected] = useState(false);
	const [session, setSession] = useState<any>(null);
	const [credentials, setCredentials] = useState<Credentials>({
		session_id: "",
		paciente_token: ""
	})

	const navigate = useNavigate();

	const sessionRef = useRef<any>(null);
	const isDisconnectingRef = useRef(false);

	const apiKey = import.meta.env.VITE_API_VONAGE_API_KEY;

	const onStreamCreated = useCallback(() => {
		toast("Novo participante entrou");
	}, []);

	const onStreamDestroyed = useCallback(() => {
		toast("Participante saiu da sessão");
		setCredentials({
			session_id: "",
			paciente_token: ""
		})
		navigate("/farmacias/fila-atendimento")
	}, []);

	const createSession = useCallback(async () => {
		if (!apiKey || !credentials.session_id || !credentials.paciente_token) {
			toast.error("Credenciais necessárias ausentes");
			navigate("/farmacias/fila-atendimento")
			return;
		}

		if (sessionRef.current && sessionRef.current.isConnected()) {
			toast("Aguardando desconexão completa antes de reconectar.");
			return;
		}

		sessionRef.current = OT.initSession(apiKey, credentials.session_id);

		const eventHandlers = {
			streamCreated: onStreamCreated,
			streamDestroyed: onStreamDestroyed,
		};
		sessionRef.current.on(eventHandlers);

		return new Promise((resolve, reject) => {
			sessionRef.current.connect(credentials.paciente_token, (err: any) => {
				if (err) {
					reject(err);
				} else {
					setConnected(true);
					isDisconnectingRef.current = false;
					setSession(sessionRef.current);
					resolve(sessionRef.current);
				}
			});
		});
	}, [apiKey, credentials.session_id, credentials.paciente_token, onStreamCreated, onStreamDestroyed]);

	const destroySession = useCallback(() => {
		if (sessionRef.current && sessionRef.current.isConnected()) {
			isDisconnectingRef.current = true;
			sessionRef.current.once("sessionDisconnected", () => {
				isDisconnectingRef.current = false;
				setConnected(false);
				setSession(null);
				sessionRef.current = null;
			});
			sessionRef.current.disconnect();
		}
	}, []);

	const values: TelemedicinaContextProps = {
		createSession,
		destroySession,
		session,
		connected,
		setCredentials
	};

	return <TelemedicinaContext.Provider value={values}>{children}</TelemedicinaContext.Provider>;
};

export { TelemedicinaContext, TelemedicinaContextProvider };
