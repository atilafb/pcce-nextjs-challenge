"use client";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AsyncAutocomplete } from "./components/AsyncAutocomplete";

export default function Home() {
  const { handleSubmit, control, watch } = useForm<{
    pessoa: string;
  }>();
  const [pessoasList, setPessoasList] = useState<
    | null
    | {
        id: number;
        nome: string;
      }[]
  >(null);
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
  }, []);

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
