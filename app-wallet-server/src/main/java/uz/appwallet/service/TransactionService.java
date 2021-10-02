package uz.appwallet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.appwallet.entity.Transaction;
import uz.appwallet.entity.Wallet;
import uz.appwallet.exception.WalletException;
import uz.appwallet.repository.TransactionRepository;
import uz.appwallet.repository.WalletRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private WalletRepository walletRepository;

    public List<Transaction> getAll(Long walletId) {
        Optional<Wallet> walletById = walletRepository.findById(walletId);
        if (walletById.isPresent()) {
            return transactionRepository.findByWallet(walletById.get());
        }
        return null;
    }

    public Transaction getById(Long wallet_id, Long id) {
        Optional<Wallet> walletById = walletRepository.findById(wallet_id);
        if (walletById.isPresent()) {
            Optional<Transaction> transactionById = transactionRepository.findById(id);
            if (transactionById.isPresent()) {
                return transactionById.get();
            }
        }
        throw new WalletException("Transaction with " + id + " does not exists!");
    }

    public Transaction createOrUpdate(Long walletId, Transaction transaction) {
        Optional<Wallet> walletById = walletRepository.findById(walletId);
        if (walletById.isPresent()) {
            transaction.setWallet(walletById.get());
            transactionRepository.save(transaction);
            return transaction;
        }
        return null;
    }

    public boolean delete(Long wallet_id, Long id) {
        Optional<Wallet> walletById = walletRepository.findById(wallet_id);
        if (walletById.isPresent()) {
            Optional<Transaction> transactionById = transactionRepository.findById(id);
            if (transactionById.isPresent()) {
                transactionRepository.delete(transactionById.get());
                return true;
            }
        }
        throw new WalletException("Transaction with " + id + " does not exists!");
    }

}
