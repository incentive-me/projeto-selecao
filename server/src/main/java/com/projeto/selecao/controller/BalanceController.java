package com.projeto.selecao.controller;

import com.projeto.selecao.domain.Balance;
import com.projeto.selecao.dto.CreateBalanceData;
import com.projeto.selecao.dto.EditBalanceData;
import com.projeto.selecao.repository.BalanceRepository;
import com.projeto.selecao.service.BalanceService;
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
@RequestMapping("/balances")
public class BalanceController {

    @Autowired
    private BalanceRepository repository;

    @Autowired
    private BalanceService service;

    @PostMapping
    @Transactional
    public ResponseEntity createBalance(@RequestBody @Valid CreateBalanceData data, UriComponentsBuilder uriBuilder) {
        Balance balance = new Balance(data);
        repository.save(balance);

        URI uri = uriBuilder.path("/balances/{id}").buildAndExpand(balance.getId()).toUri();

        return ResponseEntity.created(uri).body(balance);
    }

    @GetMapping
    public ResponseEntity<Page<Balance>> displayBalance(@PageableDefault(size = 5) Pageable page) {
        return ResponseEntity.ok(repository.findAll(page));
    }

    @PutMapping
    @Transactional
    public ResponseEntity editBalance(@RequestBody @Valid EditBalanceData data) {
        Balance balance = repository.getReferenceById(data.id());
        balance.editName(data);

        return ResponseEntity.ok(balance);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deleteBalance(@PathVariable Long id) {
        return service.deleteBalance(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity detailBalance(@PathVariable Long id) {
        return service.detailBalance(id);
    }
}
