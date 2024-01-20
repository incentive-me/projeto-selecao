package com.projeto.selecao.controller;

import com.projeto.selecao.domain.Balance;
import com.projeto.selecao.dto.CreateBalanceData;
import com.projeto.selecao.repository.BalanceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/balances")
public class BalanceController {

    @Autowired
    private BalanceRepository repository;

    @PostMapping
    @Transactional
    public void registerBalance(@RequestBody @Valid CreateBalanceData data) {
        repository.save(new Balance(data));
    }
}
