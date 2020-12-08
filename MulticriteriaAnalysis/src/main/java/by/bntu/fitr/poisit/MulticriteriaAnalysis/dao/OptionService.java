package by.bntu.fitr.poisit.MulticriteriaAnalysis.dao;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class OptionService {
    public List<Option> options;

    public OptionService() {
    }

}
