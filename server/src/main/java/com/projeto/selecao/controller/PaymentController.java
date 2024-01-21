package com.projeto.selecao.controller;

import com.projeto.selecao.domain.Payment;
import com.projeto.selecao.dto.CreatePaymentData;
import com.projeto.selecao.dto.EditPaymentData;
import com.projeto.selecao.repository.PaymentRepository;
import com.projeto.selecao.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository repository;

    @Autowired
    private PaymentService service;

    @PostMapping
    @Transactional
    public ResponseEntity createPayment(@RequestBody @Valid CreatePaymentData data, UriComponentsBuilder uriBuilder) {
        Payment payment = new Payment(data);
        repository.save(payment);

        URI uri = uriBuilder.path("/payments/{id}").buildAndExpand(payment.getId()).toUri();

        return ResponseEntity.created(uri).body(payment);
    }

    @GetMapping
    public ResponseEntity<Page<Payment>> displayPayment(@PageableDefault(size = 5) Pageable page) {
        return ResponseEntity.ok(repository.findAll(page));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletePayment(@PathVariable Long id) {
        return service.deletePayment(id);
    }

    @PutMapping
    @Transactional
    public ResponseEntity editPayment(@RequestBody EditPaymentData data) {
        Payment payment = repository.getReferenceById(data.id());
        payment.editName(data);

        return ResponseEntity.ok(payment);
    }

    @GetMapping("/{id}")
    public ResponseEntity detailPayment(@PathVariable Long id) {
        return service.detailPayment(id);
    }
}
