package com.projeto.selecao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record CreateBalanceData(
        @NotBlank
        @Size(max = 250)
        String name,

        @NotBlank
        @Size(max = 300)
        String description,

        @NotNull
        @Positive
        Double initial_value) {
}
