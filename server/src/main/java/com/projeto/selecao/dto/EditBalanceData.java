package com.projeto.selecao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EditBalanceData(
        @NotNull
        Long id,

        @NotBlank
        @Size(max = 250)
        String name) {
}
