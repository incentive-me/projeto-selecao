package com.projeto.selecao.service;

import com.projeto.selecao.repository.BalanceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository repository;

    public ResponseEntity detailBalance(Long id) {
        if (repository.findById(id).isEmpty()) throw new EntityNotFoundException();

        return ResponseEntity.ok(repository.findById(id));
    }

    public ResponseEntity deleteBalance(Long id) {
        if (repository.findById(id).isEmpty()) throw new EntityNotFoundException();

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
