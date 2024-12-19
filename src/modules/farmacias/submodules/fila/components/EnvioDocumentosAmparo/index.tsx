
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@components/ui/button";
import { errorHandler } from "@api/errorHandler";
import { FiAlertTriangle } from "react-icons/fi";
import { GetDocsInputDto, GetDocsTasyOutputDto } from "../../service/getDocsTasy/getDocsTasy.dto";
import { getDocsTasyService } from "../../service/getDocsTasy/getDocsTasy.service";
import { SendDocsInputDto } from "../../service/sendDocs/sendDocs.dto";
import { sendDocsService } from "../../service/sendDocs/sendDocs.service";
import { getDocsSolusService } from "../../service/getDocsSolus/getDocsSolus.service";
import { GetDocsSolusOutputDto } from "../../service/getDocsSolus/getDocsSolus.dto";

const FormSendSchema = z.object({
    items: z.array(z.string()).min(1, { message: 'Selecione pelo menos um documento' }),
    email: z.string().min(9, { message: 'Insira um email válido!' }),
    // phone: z.string(),
})

type Props = {
    isOpen: boolean;
    handleClose: () => void
    selectedAtendimento?: GetDocsInputDto;
}

const EnvioDocumentos = ({ isOpen, handleClose, selectedAtendimento }: Props) => {
    const [docsTasy, setDocsTasy] = useState<GetDocsTasyOutputDto>({
        atestados: [],
        pedidos_exames: [],
        receitas: []
    } as GetDocsTasyOutputDto);
    const [docsSolus, setDocsSolus] = useState<GetDocsSolusOutputDto>([] as GetDocsSolusOutputDto);

    async function getDocs() {
        try {

            if (selectedAtendimento?.nr_sequencia) {
                const result = await getDocsTasyService.execute(selectedAtendimento.nr_sequencia);
                setDocsTasy(result);
            }
            if (selectedAtendimento?.nnumeguia) {
                const result = await getDocsSolusService.execute(selectedAtendimento.nnumeguia);
                setDocsSolus(result);
            }
            formSend.reset()
        } catch (err) {
            errorHandler(err);
        }
    }

    const formSend = useForm<z.infer<typeof FormSendSchema>>({
        resolver: zodResolver(FormSendSchema),
        defaultValues: {
            items: [],
            email: "",
            // phone: "",
        },
    });

    async function onSend(data: z.infer<typeof FormSendSchema>) {
        const sendDocs: SendDocsInputDto = {
            atestados: data.items.includes("ATESTADOS") ? docsTasy?.atestados : [],
            receitas: data.items.includes("RECEITAS") ? docsTasy?.receitas : [],
            pedidos_exames: data.items.includes("PEDIDOS_EXAMES") ? docsTasy?.atestados : [],
            memed: data.items.includes("MEMED") ? docsSolus : [],
            email: data.email!,
            // telefone: data.phone,
        };

        try {
            toast.loading("Enviando documentos");
            await sendDocsService.execute(sendDocs);
            handleClose()
            toast.success("Documentos enviados com sucesso");
        } catch {
            toast.error("Erro ao enviar documentos");
        }
    }

    useEffect(() => {
        getDocs()
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Envio de documentos
                    </DialogTitle>
                    <DialogDescription>
                        Selecione aqui o documento que você gostaria
                        de enviar para o paciente:
                    </DialogDescription>
                </DialogHeader>
                <Form {...formSend}>
                    <form
                        onSubmit={formSend.handleSubmit(onSend)}
                        className="space-y-5"
                    >
                        <FormField
                            control={formSend.control}
                            name="items"
                            render={() => (
                                <FormItem>
                                    {docsTasy?.atestados.length ? (
                                        <FormField
                                            key={'ATESTADOS'}
                                            control={formSend.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={'ATESTADOS'}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <div className="flex flex-row justify-center items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes('ATESTADOS')}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked ?
                                                                            field.onChange([...field.value, 'ATESTADOS'])
                                                                            : field.onChange(field.value?.filter((value) => value !== 'ATESTADOS'));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal p-2">
                                                                Atestados
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ) : (<></>)}
                                    {docsTasy?.receitas.length ? (
                                        <FormField
                                            key={'RECEITAS'}
                                            control={formSend.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={'RECEITAS'}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <div className="flex flex-row justify-center items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes('RECEITAS')}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked ?
                                                                            field.onChange([...field.value, 'RECEITAS'])
                                                                            : field.onChange(field.value?.filter((value) => value !== 'RECEITAS'));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal p-2">
                                                                Receitas
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ) : (<></>)}
                                    {docsTasy?.pedidos_exames.length ? (
                                        <FormField
                                            key={'PEDIDOS_EXAMES'}
                                            control={formSend.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={'PEDIDOS_EXAMES'}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <div className="flex flex-row justify-center items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes('PEDIDOS_EXAMES')}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked ?
                                                                            field.onChange([...field.value, 'PEDIDOS_EXAMES'])
                                                                            : field.onChange(field.value?.filter((value) => value !== 'PEDIDOS_EXAMES'));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal p-2">
                                                                Exames
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ) : (<></>)}
                                    {docsSolus?.length ? (
                                        <FormField
                                            key={'MEMED'}
                                            control={formSend.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={'MEMED'}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <div className="flex flex-row justify-center items-center">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes('MEMED')}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked ?
                                                                            field.onChange([...field.value, 'MEMED'])
                                                                            : field.onChange(field.value?.filter((value) => value !== 'MEMED'));
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal p-2">
                                                                Memed
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ) : (<></>)}
                                    {(docsSolus.length === 0 && docsTasy && docsTasy.atestados.length === 0 && docsTasy.receitas.length === 0 && docsTasy.pedidos_exames.length === 0) ? (
                                        <div className="!pt-2">
                                            <FormLabel className="flex items-center gap-2 text-sm text-amber-500">
                                                <FiAlertTriangle /> Sem documentos para ser enviados.
                                            </FormLabel>
                                        </div>
                                    ) : (<></>)}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formSend.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Insira o email do paciente..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* TODO removido o envio atraves do numero de telefone */}
                        {/* <FormField
                                    control={formSend.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Insira o telefone do paciente..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                        <Button
                            className="w-full"
                            type="submit"
                        >
                            <p className="p-1">Enviar</p>
                            <IoSend />{" "}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export { EnvioDocumentos };
