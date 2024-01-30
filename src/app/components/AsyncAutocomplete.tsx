"use client";
import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type AsyncAutocompleteProps<
  O extends { id: number; nome: string },
  TField extends FieldValues
> = {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  setOpen: (value: boolean) => void;
  open: boolean;
  loading: boolean;
};

export function AsyncAutocomplete<
  O extends { id: number; nome: string },
  TField extends FieldValues
>(props: AsyncAutocompleteProps<O, TField>) {
  const { control, options, name, setOpen, open, loading } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
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
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Opcoes"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            sx={{ width: 300 }}
          />
        );
      }}
    />
  );
}
