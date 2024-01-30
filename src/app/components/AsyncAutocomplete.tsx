"use client";
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type AsyncAutocompleteProps<
  O extends { id: number; nome: string },
  TField extends FieldValues
> = {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
};

export function AsyncAutocomplete<
  O extends { id: number; nome: string },
  TField extends FieldValues
>(props: AsyncAutocompleteProps<O, TField>) {
  const { control, options, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <Autocomplete
            value={
              value
                ? options.find((option) => {
                    return value === option.id;
                  }) ?? null
                : null
            }
            getOptionLabel={(option) => {
              return option.nome;
            }}
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue.id : null);
            }}
            options={options}
            renderInput={(params) => <TextField {...params} label="Opcoes" />}
            sx={{ width: 300 }}
          />
        );
      }}
    />
  );
}
