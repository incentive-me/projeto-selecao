package com.projeto.selecao.domain;

import com.projeto.selecao.dto.CreatePaymentData;
import com.projeto.selecao.dto.EditPaymentData;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "payments")
@Entity(name = "Payment")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double payment_value;

    private Long balance_id;

    public Payment(CreatePaymentData data) {
        this.name = data.name();
        this.description = data.description();
        this.payment_value = data.payment_value();
        this.balance_id = data.balance_id();
    }

    public void editName(EditPaymentData data) {
        this.name = data.name();
    }
}
