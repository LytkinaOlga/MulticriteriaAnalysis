package by.bntu.fitr.poisit.MulticriteriaAnalysis.controllers;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.dao.CriteryService;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.dao.MainTableService;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.dao.MarksDAO;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.dao.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class IndexController {
    @Autowired
    CriteryService criteryService;
    @Autowired
    OptionService optionService;
    @Autowired
    MainTableService mainTableService;
    @Autowired
    MarksDAO marksDAO;

    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.POST})
    @PostMapping("/")
    public void indexSubmit(@RequestBody List<Critery> criteries) {

        //criteryService.setCriteries((Critery[]) criteries.toArray());
        criteryService.setCriteries(criteries);
        System.out.println("Arrays.toString(criteries.toArray()) = " + Arrays.toString(criteries.toArray()));
    }
    @GetMapping("/options")
    public void addOptions(Model model){

    }
    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.POST})
    @PostMapping("/options")
    public void optionsSubmit(@RequestBody List<Option> options
    ) {
        optionService.setOptions(options);
        System.out.println("Arrays.toString(options.toArray()) = " + Arrays.toString(options.toArray()));
    }

    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.GET})
    @GetMapping("/getSumOfMarks")
    public double[] getMarks(Model model){
        createMap();

        double[] arrayOfSum= new double[(optionService.options.size())];

        for (Option option: optionService.options){
            int index = optionService.options.indexOf(option);
            arrayOfSum[index] = mainTableService.countSum(option);
        }
        return arrayOfSum;
    }

    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.POST})
    @PostMapping("/getMarks")
    public void getMarksSubmit(@RequestBody List<List<Double>> marks) {
        marksDAO.setMarks(marks);
        System.out.println("Arrays.toString(options.toArray()) = " +    Arrays.toString(marks.toArray()));

    }

    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.GET})
    @GetMapping("/getMaxSum")
        public double finMaxSum(){
        return findMaxSum();
    }


    @CrossOrigin(originPatterns = {"http://localhost:3000"}, methods = {RequestMethod.GET})
    @GetMapping("/getAnswer")
    public String getAnswer(){
        double max = findMaxSum();
        for (Option option: optionService.options){
            double temp = mainTableService.countSum(option);
            if (temp == max){
                return option.getName();
            }
        }
        return "";
    }

    public double findMaxSum(){
        createMap();
        double[] arrayOfSum = new double[(optionService.options.size())];

        for (Option option : optionService.options) {
            int index = optionService.options.indexOf(option);
            arrayOfSum[index] = mainTableService.countSum(option);
        }
        double max = arrayOfSum[0];
        for (int i = 0; i< arrayOfSum.length; i++){
            if (arrayOfSum[i]> max){
                max = arrayOfSum[i];
            }
        }
        return max;
    }

    public void createMap(){
        for(Option option: optionService.options){
            int index = optionService.options.indexOf(option);
            mainTableService.addInfInMap(option, marksDAO.getMarks().get(index));
        }
    }


}
