"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { AsyncAutocomplete } from "./components/AsyncAutocomplete";

export default function Home() {
  // o name do controller define direitinho o retorno aqui
  const { handleSubmit, control, watch } = useForm<{
    carMaker: string;
    carModel: string;
  }>();

  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
  ];

  return (
    <Box p={2}>
      <h1>PCCE NEXTJS CHALLENGE</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Form data submitted", data);
        })}
      >
        <Box>
          <Box>{watch("carMaker")}</Box>
          <AsyncAutocomplete
            control={control}
            name={"carMaker"}
            options={options}
          />
          <br />
          <AsyncAutocomplete
            control={control}
            name={"carModel"}
            options={options}
          />
        </Box>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </Box>
  );
}
