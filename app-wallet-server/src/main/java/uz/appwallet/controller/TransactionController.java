package uz.appwallet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uz.appwallet.entity.Transaction;
import uz.appwallet.service.TransactionService;
import uz.appwallet.service.ValidationErrorService;

import javax.validation.Valid;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @GetMapping("/{wallet_id}")
    public ResponseEntity<?> getAll(@PathVariable Long wallet_id) {
        return new ResponseEntity<>(transactionService.getAll(wallet_id), HttpStatus.OK);
    }

    @GetMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> getById(@PathVariable Long wallet_id, @PathVariable Long id) {
        return new ResponseEntity<>(transactionService.getById(wallet_id, id), HttpStatus.OK);
    }

    @PostMapping("/{wallet_id}")
    public ResponseEntity<?> create(
            @PathVariable Long wallet_id,
            @Valid @RequestBody Transaction transaction,
            BindingResult result
    ) {
        ResponseEntity errors = validationErrorService.validate(result);
        if (errors != null) return errors;

        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id, transaction);
        return new ResponseEntity<Transaction>(transactionSaved, HttpStatus.CREATED);
    }

    @PutMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long wallet_id,
            @PathVariable Long id,
            @Valid @RequestBody Transaction transaction,
            BindingResult result
    ) {
        ResponseEntity errors = validationErrorService.validate(result);
        if (errors != null) return errors;
        transaction.setId(id);
        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id, transaction);
        return new ResponseEntity<Transaction>(transactionSaved, HttpStatus.OK);
    }

    @DeleteMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> delete(@PathVariable Long wallet_id, @PathVariable Long id) {
        transactionService.delete(wallet_id, id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
