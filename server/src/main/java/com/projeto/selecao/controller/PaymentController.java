package com.projeto.selecao.controller;

import com.projeto.selecao.domain.Payment;
import com.projeto.selecao.dto.CreatePaymentData;
import com.projeto.selecao.dto.EditPaymentData;
import com.projeto.selecao.repository.PaymentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

    @PostMapping
    @Transactional
    public void createPayment(@RequestBody @Valid CreatePaymentData data) {
        repository.save(new Payment(data));
    }

    @GetMapping
    public Page<Payment> displayPayment(@PageableDefault(size = 5) Pageable page) {
        return repository.findAll(page);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deletePayment(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping
    @Transactional
    public void editPayment(@RequestBody EditPaymentData data) {
        Payment payment = repository.getReferenceById(data.id());
        payment.editName(data);
    }
}
