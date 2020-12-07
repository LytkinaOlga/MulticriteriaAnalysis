package by.bntu.fitr.poisit.MulticriteriaAnalysis.controllers;

import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Critery;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Form;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.bean.Option;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.service.CriteryService;
import by.bntu.fitr.poisit.MulticriteriaAnalysis.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class IndexController {
    @Autowired
    CriteryService criteryService;
    @Autowired
    OptionService optionService;

    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("criteries", new CriteryService());
        model.addAttribute("options", new OptionService());
        return "index";
    }
    @PostMapping("/")
    public String addCriteries(@RequestParam("criteriesCount") int criteriesCount,
                        @RequestParam("optionCount") int optionCount,
                        @ModelAttribute("criteries") CriteryService criteries,
                        @ModelAttribute("options") OptionService options,
                        Model model) {
        model.addAttribute("criteriesCount", criteriesCount);
        model.addAttribute("optionCount", optionCount);

        List<Critery> criteriesList = Arrays.asList(criteryService.createArrayOfCriteries(criteriesCount));
        List<Option> optionsList = Arrays.asList(optionService.createArrayOfOptions(optionCount));

        model.addAttribute("criteries", criteriesList);
        model.addAttribute("options", optionsList);
        return "addCriteries";
    }

    @GetMapping("/addCriteries")
    public String criteries(Model model){
        model.addAttribute("critery", new Critery());
        model.addAttribute("option", new Option());
        return "addCriteries";
    }

    @PostMapping("/addCriteries")
    public String saveCriteries(@RequestParam("criteryName") String criteryName,
                                @RequestParam("criteryWeight") String criteryWeight,
                                @ModelAttribute("criteries") List<Critery> criteries,
                                @ModelAttribute("options") List<Option> options,
                                @ModelAttribute("critery") Critery critery,
                                @ModelAttribute("option") Option option,
                                Model model){
        criteries.add(critery);
        options.add(option);
        return "mainTable";
    }
    @GetMapping("/mainTable")
    public String mainTable(Model model){
        return "mainTable";
    }
}
