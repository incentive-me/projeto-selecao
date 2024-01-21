package com.projeto.selecao.controller;

import com.projeto.selecao.domain.Balance;
import com.projeto.selecao.dto.CreateBalanceData;
import com.projeto.selecao.dto.EditBalanceData;
import com.projeto.selecao.repository.BalanceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/balances")
public class BalanceController {

    @Autowired
    private BalanceRepository repository;

    @PostMapping
    @Transactional
    public void createBalance(@RequestBody @Valid CreateBalanceData data) {
        repository.save(new Balance(data));
    }

    @GetMapping
    public Page<Balance> displayBalance(@PageableDefault(size = 5) Pageable page) {
        return repository.findAll(page);
    }

    @PutMapping
    @Transactional
    public void editBalance(@RequestBody @Valid EditBalanceData data) {
        Balance balance = repository.getReferenceById(data.id());
        balance.editName(data);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deleteBalance(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
