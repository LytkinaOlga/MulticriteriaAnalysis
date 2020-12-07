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
        model.addAttribute("form", new Form());

        return "index";
    }
    @PostMapping("/")
    public String indexSubmit(@ModelAttribute Form form, Model model) {
        model.addAttribute("form", form);

        List<Critery> criteries = Arrays.asList(criteryService.createArrayOfCriteries(form.getCriteriesCount()));
        List<Option> options = Arrays.asList(optionService.createArrayOfOptions(form.getOptionCount()));

        model.addAttribute("criteries", criteries);
        model.addAttribute("options", options);
        return "addCriteries";
    }

    @GetMapping("/addCriteries")
    public String criteries(Model model){

        return "addCriteries";
    }

    @PostMapping("/addCriteries")
    public String saveCriteries(@RequestParam("criteryName") String criteryName,
                                @RequestParam("criteryWeight") int criteryWeight,
                                @ModelAttribute("criteries") List<Critery> criteries,
                                @ModelAttribute("options") List<Option> options,

                                Model model){
        criteries.add(new Critery(criteryName, criteryWeight));
        model.addAttribute("criteries", criteries);
        return "mainTable";
    }
    @GetMapping("/mainTable")
    public String mainTable(Model model){
        return "mainTable";
    }
}
