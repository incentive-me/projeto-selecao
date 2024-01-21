package com.projeto.selecao.domain;

import com.projeto.selecao.dto.CreateBalanceData;
import com.projeto.selecao.dto.EditBalanceData;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "balances")
@Entity(name = "Balance")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double initial_value;

    private Double remaining_value;

    public Balance(CreateBalanceData data) {
        this.name = data.name();
        this.description = data.description();
        this.initial_value = data.initial_value();
        this.remaining_value = data.initial_value();
    }

    public void editName(EditBalanceData data) {
        this.name = data.name();
    }
}
