import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { DialogContent } from "@components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { LucideUserPlus2 } from "lucide-react";
import { FaUserPlus } from "react-icons/fa6";
import { CreateUserFormSchema, createUserFormSchema } from "../../schemas/formSchema";
import toast from "react-hot-toast";
import { useCreatePessoaService } from "../../services/createPessoa/createPessoa.service";
import { errorHandler } from "@api/errorHandler";
import { CreatePessoaInputDto } from "../../services/createPessoa/createPessoa.dto";

function RegisterPessoaComponent() {
    const refCloseDialog = useRef<HTMLButtonElement>(null);

    const createUserForm = useForm<CreateUserFormSchema>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            cncomusua: "",
            cpf_pessoa: "",
            nnumeperf: "PA - FARMACIAS",
            usuario: "",
        },
    });

    async function createUser(data: CreateUserFormSchema) {
        const params: CreatePessoaInputDto = {
            cncomusua: data.cncomusua,
            cpf_pessoa: data.cpf_pessoa,
        };

        try {
            await useCreatePessoaService.execute(params);

            refCloseDialog.current?.click();
            toast.success('Usuário criado com sucesso!')
            createUserForm.reset()
        } catch (error) {
            errorHandler(error);
        }
    }

    useEffect(() => {
        createUserForm.setValue("usuario", createUserForm.getValues("cpf_pessoa").replace(/[^0-9]/g, ""));
    }, [createUserForm.watch('cpf_pessoa')])

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    ref={refCloseDialog}
                    size="sm"
                    className="space-x-2 font-semibold w-full gap-2"
                >
                    <FaUserPlus />
                    Criar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...createUserForm}>
                    <div className="flex justify-center w-fit items-center text-tertiary">
                        <LucideUserPlus2 />
                        <p className="text-sm font-semibold p-1">
                            Registro de usuário
                        </p>
                    </div>
                    <form
                        onSubmit={createUserForm.handleSubmit(createUser)}
                        className="flex flex-col w-full justify-center gap-2"
                    >
                        <FormField
                            name="cncomusua"
                            control={createUserForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createUserForm.control}
                            name="cpf_pessoa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cpf</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="nnumeperf"
                            control={createUserForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Perfil (Padrão)</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="usuario"
                            control={createUserForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={"default"} size='default' type="submit">Enviar</Button>
                    </form>
                </Form>
            </DialogContent >
        </Dialog >
    );
}

export { RegisterPessoaComponent }
