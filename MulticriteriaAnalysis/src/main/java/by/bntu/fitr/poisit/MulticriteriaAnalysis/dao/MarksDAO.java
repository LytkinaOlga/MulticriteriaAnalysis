package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component
public class MarksDAO {
    public List<List<Double>> marks;
}
