package uz.appwallet.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    @Column(nullable = false, unique = true)
    @NotBlank(message = "Name can't be blank!")
    @Size(min = 2, max = 30)
    private String name;

    //    @Column(nullable = false, unique = true)
    @Size(min = 2, max = 30)
    private String accountNumber;

    @Size(max = 100)
    private String description;

    @Min(1)
    @Max(3)
    private Integer priority;     // 1=High;    2=Medium;    3=Low;

    private Double currentBalance;

    @OneToMany(
            cascade = CascadeType.REFRESH,
            fetch = FetchType.LAZY,
            mappedBy = "wallet",
            orphanRemoval = true
    )
    private List<Transaction> transactions;

    @PrePersist
    public void setBalance() {
        this.currentBalance = new Double(0);
    }

}
