"use client";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AsyncAutocomplete } from "./components/AsyncAutocomplete";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  pessoa: z.string({
    required_error: "Uma pessoa deve ser selecionada",
    invalid_type_error: "Uma pessoa deve ser selecionada",
  }),
});

type PessoaSchema = z.infer<typeof schema>;

export default function Home() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<{
    pessoa: PessoaSchema;
  }>({ resolver: zodResolver(schema) });
  const [pessoasList, setPessoasList] = useState<
    | {
        id: number;
        nome: string;
      }[]
  >([]);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const loading = openAutocomplete && pessoasList.length === 0;

  const pessoa = watch("pessoa");

  const personListRequest = async () => {
    let pessoasListData = await fetch("http://localhost:8000/pessoa");
    let pessoasListJson = await pessoasListData.json();
    return pessoasListJson;
  };

  const personDataRequest = async () => {
    let pessoaData = await fetch(`http://localhost:8000/pessoa-info/${pessoa}`);
    let pessoaDataJson = await pessoaData.json();
    return pessoaDataJson;
  };

  useEffect(() => {
    if (openAutocomplete) {
      personListRequest().then((response) => {
        const mappedResponse = response.map(
          (data: { id: number; nome: string }) => {
            return {
              id: data.id,
              nome: data.nome,
            };
          }
        );
        setPessoasList(mappedResponse);
      });
    }
  }, [openAutocomplete]);

  const onSubmit = () => {
    personDataRequest().then((response) => {
      console.log(response.info);
    });
  };

  return (
    <Box p={2}>
      <h1>PCCE NEXTJS CHALLENGE</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <AsyncAutocomplete
            control={control}
            name={"pessoa"}
            options={pessoasList ?? []}
            setOpen={setOpenAutocomplete}
            open={openAutocomplete}
            loading={loading}
          />
          <br />
        </Box>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </Box>
  );
}
