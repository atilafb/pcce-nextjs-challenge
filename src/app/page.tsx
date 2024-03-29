"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AsyncAutocomplete } from "./components/AsyncAutocomplete";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAsyncRequest } from "./hooks/useAsyncRequest";

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
  const pessoa = watch("pessoa");
  
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const { data: pessoasList, loading: loadingPessoas } = useAsyncRequest(
    "http://localhost:8000/pessoa",
    openAutocomplete
  );
  const personDataRequest = async () => {
    let pessoaData = await fetch(`http://localhost:8000/pessoa-info/${pessoa}`);
    let pessoaDataJson = await pessoaData.json();
    return pessoaDataJson;
  };

  const onSubmit = async () => {
    try {
      const response = await personDataRequest();
      console.log(response.info);
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PCCE NextJS Challenge</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ marginTop: 2 }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 8, boxShadow: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Autocomplete Load on Open with React-Hook-Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <AsyncAutocomplete
                control={control}
                name={"pessoa"}
                options={pessoasList ?? []}
                setOpen={setOpenAutocomplete}
                open={openAutocomplete}
                loading={loadingPessoas}
              />
            </Box>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
