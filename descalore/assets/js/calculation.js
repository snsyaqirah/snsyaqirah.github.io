function calcAll() 
{
    const name = document.querySelector("#name").value;
    const weight = document.querySelector("#weight").value;
    const height = document.querySelector("#height").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
  /////DESCALORE - BMR////////////
    let bmr;
    if (gender === "Male") 
    {
      bmr = 66.47 + (13.75 * weight) + (5 * height) - (6.57 * age);
    } 
    else if (gender === "Female") 
    {
      bmr = 665.1 + (9.65 * weight) + (1.85 * height) - (4.68 * age);
    }

    document.querySelector("#resultBMR").innerHTML = `BMR: ${bmr.toFixed(2)} calories.`;
  /////DESCALORE - BMR////////////

  /////DESCALORE - BMRA////////////
    const activity = document.querySelector("#acti").value;
    var bmra = 0

    if (activity === "sedentary")
    {
      bmra = bmr*1.2;
    }
    else if (activity === "lightly")
    {
      bmra = bmr * 1.375;
    }
    else if (activity === "moderate")
    {
      bmra = bmr * 1.55;
    }
    else if (activity === "very")
    {
      bmra = bmr * 1.725;
    }
    else if (activity === "extra")
    {
      bmra = bmr * 1.9;
    }

    document.querySelector("#resultBMRA").innerHTML = `BMR with Activity Rate: ${bmra.toFixed(2)} calories.`;
  /////DESCALORE - BMRA////////////

  /////DESCALORE - BMI////////////
    const bmi = weight / (height/100 * height/100);
    document.querySelector("#resultBMI").innerHTML = `BMI: ${bmi.toFixed(2)}`;

    function catBMI(bmi) 
    {
      if (bmi < 18.5) {
        return "Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal weight";
      } else if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
      } else if (bmi >= 30) {
        return "Obese";
      }
    }
    const statBMI = catBMI(bmi);
    document.querySelector("#statusBMI").innerHTML = "Status BMI: " + statBMI;
  /////DESCALORE - BMI////////////

  /////DESCALORE - MIN & MAX BMR////
    const bmrminb = bmr * 0.25;
    const bmrmaxb = bmr * 0.3;
    const tbmrb = (bmrminb + bmrmaxb) / 2;

    const bmrminms = bmr * 0.05;
    const bmrmaxms = bmr * 0.1;
    const tbmrms = (bmrminms + bmrmaxms) / 2;

    const bmrminl = bmr * 0.35;
    const bmrmaxl = bmr * 0.4;
    const tbmrl = (bmrminl + bmrmaxl) / 2;

    const bmrmintt = bmr * 0.05;
    const bmrmaxtt = bmr * 0.1;
    const tbmrtt = (bmrmintt + bmrmaxtt) / 2;

    const bmrmind = bmr * 0.15;
    const bmrmaxd = bmr * 0.2;
    const tbmrd = (bmrmind + bmrmaxd) / 2;
  /////DESCALORE - MIN & MAX BMR////

  /////DESCALORE - MIN & MAX BMRA////
  const bmraminb = bmra * 0.25;
  const bmramaxb = bmra * 0.3;
  const tbmrab = (bmraminb + bmramaxb) / 2;

  const bmraminms = bmra * 0.05;
  const bmramaxms = bmra * 0.1;
  const tbmrams = (bmraminms + bmramaxms) / 2;

  const bmraminl = bmra * 0.35;
  const bmramaxl = bmra * 0.4;
  const tbmral = (bmraminl + bmramaxl) / 2;

  const bmramintt = bmra * 0.05;
  const bmramaxtt = bmra * 0.1;
  const tbmratt = (bmramintt + bmramaxtt) / 2;

  const bmramind = bmra * 0.15;
  const bmramaxd = bmra * 0.2;
  const tbmrad = (bmramind + bmramaxd) / 2;
/////DESCALORE - MIN & MAX BMRA////





////DESCLORE - DIETARY ADVICE////

//RULE: BP
  const bloodpressure = document.querySelector("#bp").value;
    var bp = ""

    if (bloodpressure === "Yes")
    {
      bp = "To manage your blood pressure, you should reduce your sodium intake to 1500 mg per day or less."
    }
    else if (bloodpressure === "No")
    {
      bp = "You don't have blood pressure."
    }

    document.querySelector("#resultBP").innerHTML = bp;

//RULE: DIABETES
const diabetes = document.querySelector("#diabetes").value;
var diabetess = ""

if (diabetes === "Yes")
{
  diabetess = "To help manage blood sugar levels, follow a diet that is low in carbohydrates and high in fiber."
}
else if (diabetes === "No")
{
  diabetess = "You don't have diabetes."
}

document.querySelector("#resultDIABETES").innerHTML = diabetess;

//RULE: CHOLESTEROL
const ch = document.querySelector("#cholesterol").value;
var cholesterol = ""

if (ch === "Yes")
{
  cholesterol = "To manage your cholesterol, you should reduce your intake of saturated and trans fats and increase your intake of fruits, vegetables, and whole grains."
}
else if (ch === "No")
{
  cholesterol = "You don't have cholesterol."
}

document.querySelector("#resultCHOLESTEROL").innerHTML = cholesterol;

//RULE: VEGETARIAN
const vege = document.querySelector("#vegetarian").value;
var vegetarian = ""

if (vege === "Yes")
{
  vegetarian = "As a vegetarian, you can substitute plant-based sources of protein such as beans, tofu, and tempeh for meat."
}
else if (vege === "No")
{
  vegetarian = "You are not vegetarian."
}

document.querySelector("#resultVEGETARIAN").innerHTML = vegetarian;

//RULE: LACTOSE 
const lact = document.querySelector("#lactose").value;
var lactose = ""

if (lact === "Yes")
{
  lactose = "If you are lactose intolerant, you can substitute lactose-free dairy products or non-dairy sources of calcium such as fortified soy milk, almonds, and leafy greens."
}
else if (lact === "No")
{
  lactose = "You are not lactose intolerance."
}

document.querySelector("#resultLACTOSE").innerHTML = lactose;

var advice = "";
    
///START MALE OV SEDENTARY RULES///
if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
  advice = "Based on the information provided, it appears that you are a male who has a sedentary lifestyle, has a BMI that falls between 25 and 29.9, has high blood pressure, and consumes a diet that includes vegetables, cholestrol and lactose. In order to improve your health, it is recommended that you consider increasing your physical activity levels, incorporating more whole foods into your diet, reducing your intake of saturated fats, and limiting your intake of sodium. Additionally, you may want to consult with a healthcare provider to discuss potential medication or treatment options for your high blood pressure.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a sedentary male with an overweight BMI, high blood pressure, diabetes, high cholesterol, and a vegetarian diet, it's important that you make changes to your lifestyle and eating habits to improve your health. Since you are lactose intolerant, it's especially important to find alternative sources of calcium and vitamin D to maintain good bone health. You should work with a registered dietitian and your doctor to develop a personalized plan that includes regular exercise, a balanced diet that meets your nutritional needs, and appropriate medication to manage your blood pressure and diabetes. You may also benefit from stress-management techniques and other lifestyle changes, such as getting enough sleep and reducing alcohol intake. Making these changes can help you reduce your risk of heart disease, stroke, and other serious health conditions.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = "A balanced diet with moderate portions is essential to manage your weight and prevent health issues related to high blood pressure, diabetes, and high cholesterol. Try to incorporate more whole foods, fruits, and vegetables, while limiting processed and sugary foods. Since you're not a vegetarian, you can also include lean meats, fish, and low-fat dairy products in your meals. However, since you are lactose intolerant, you may need to choose lactose-free or low-lactose options. Your healthcare provider can also suggest appropriate dietary supplements if needed. Additionally, regular physical activity is important to maintain good health, so try to incorporate more movement into your day, such as brisk walking or other forms of exercise. Remember, small changes in your daily routine can make a big difference in your health and wellbeing.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = "it is recommended that you increase your physical activity, choose foods that are lower in saturated and trans fats, and limit your intake of sugar and salt. You may benefit from increasing your intake of fiber and whole grains, as well as fruits and vegetables that are lower in carbohydrates. You should also limit your alcohol intake and quit smoking, if applicable. Your dietitian can work with you to create a plan that meets your specific needs and goals";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "You are a male with a sedentary lifestyle and a BMI that classifies you as overweight. You also have high blood pressure and diabetes, but not high cholesterol. You follow a vegetarian diet and can tolerate lactose. In order to improve your health, it is recommended that you limit your daily intake of calories and consume a balanced diet that includes fruits, vegetables, whole grains, lean proteins, and low-fat dairy products. You should also incorporate physical activity into your daily routine and aim for at least 30 minutes of moderate-intensity exercise most days of the week. It's important to monitor your blood pressure and blood sugar regularly and follow any medication and treatment plans prescribed by your doctor. If you have any questions or concerns, it's recommended that you consult with a healthcare professional for personalized advice";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "You are a male with a sedentary lifestyle and have a BMI in the overweight range. You have high blood pressure and diabetes, but don't have high cholesterol. You follow a vegetarian diet and don't consume dairy products. It is important for you to maintain a healthy diet and lifestyle to manage your conditions. Try to incorporate a variety of nutrient-dense plant-based foods to meet your nutritional needs. Consider consulting with a registered dietitian to help you develop a personalized nutrition plan that meets your specific needs.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "As a male with a sedentary lifestyle and being overweight, managing your blood pressure and diabetes is essential. Avoid consuming high cholesterol and lactose products. Increase your physical activity level and choose a balanced and healthy diet. You may want to consult a healthcare professional for a personalized plan to manage your health.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "Given your current health condition, it is important to make significant lifestyle changes to improve your health. You should consult a registered dietitian to develop a personalized meal plan that takes your nutritional needs into account, while also promoting weight loss. In addition, it is highly recommended that you engage in moderate exercise for at least 30 minutes per day to help lower your blood pressure, manage diabetes, and reduce the risk of cardiovascular disease. Furthermore, it may be helpful to manage your stress levels and get enough sleep to further support your overall health. While making these lifestyle changes may be challenging, they will be well worth it in the long run for a healthier and happier life.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "Based on your information, it's important to manage your weight and blood pressure. Since you're overweight, you might want to consider ways to lose weight, such as exercising regularly and making dietary changes. Additionally, since you have high blood pressure, it's crucial to monitor it regularly and take any medication your doctor prescribes. As a diabetic, you should also keep your blood sugar under control and work with your doctor to manage your condition. Given your high cholesterol, you may want to limit your intake of saturated and trans fats and increase your consumption of high-fiber foods, fruits, and vegetables. As a vegetarian, you might want to consider incorporating plant-based protein sources into your diet to help maintain healthy blood sugar and cholesterol levels. Finally, if you're lactose intolerant, there are several alternatives to dairy that you can try, such as soy or almond milk. Overall, it's important to work with your healthcare provider to develop a comprehensive plan for managing your various health conditions";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a sedentary male with a BMI in the overweight range, it is important to monitor your blood pressure as it appears to be high. While you do not have diabetes, you should be aware of the potential risk of developing it, especially since you are not a vegetarian and have no lactose intolerance. Additionally, you have indicated that you have high cholesterol levels, which could also contribute to an increased risk of developing cardiovascular disease. It is recommended that you follow a heart-healthy diet, which includes limiting your intake of saturated and trans fats, and increasing your consumption of fruits, vegetables, whole grains, lean proteins, and healthy fats. It is also important to engage in regular physical activity, such as walking, biking, or swimming, for at least 30 minutes a day, most days of the week, to help improve your overall health and reduce your risk of chronic diseases.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `Since you have high blood pressure and high cholesterol, it is important to make some changes in your diet and lifestyle. Here are some recommendations:
  Follow a low-sodium diet to help lower your blood pressure. This means limiting your intake of salty foods like processed snacks, canned foods, and fast food.
  Increase your intake of fruits and vegetables, whole grains, and lean protein sources such as chicken, fish, and legumes. These foods are high in fiber and other nutrients that can help lower cholesterol.
  Limit your intake of saturated and trans fats, which can raise your cholesterol levels. This means avoiding fried foods, processed snacks, and fatty meats.
  Increase your physical activity level by incorporating more exercise into your daily routine. Aim for at least 30 minutes of moderate-intensity activity, such as brisk walking, on most days of the week.
  Consider talking to your doctor about medication options to help manage your blood pressure and cholesterol levels.
  If you are lactose intolerant, consider alternative sources of calcium, such as fortified plant milks or supplements.
  Remember, making small changes to your diet and lifestyle can have a big impact on your health. Be sure to talk to your doctor about any changes you plan to make, and work with a registered dietitian to develop a personalized eating plan.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `Based on the given information, if the person is a sedentary male with a BMI in the overweight range (25 to 29.9) and has high blood pressure but does not have diabetes, and has high cholesterol and is not a vegetarian and is not lactose intolerant, they may benefit from the following advice:
  Increase physical activity: Incorporate regular exercise, such as brisk walking or light jogging, into daily routine.
  Modify diet: Reduce saturated and trans fats intake and increase consumption of fruits, vegetables, whole grains, and lean protein sources.
  Reduce sodium intake: Limit the amount of salt in the diet to help lower blood pressure.
  Take medications as prescribed: If the person has been prescribed medication for high blood pressure and high cholesterol, it is important to take them as directed by their doctor.
  Regular monitoring: Regularly monitor blood pressure and cholesterol levels as directed by a doctor to ensure that they are under control.
  It is also recommended that the person consult with their doctor or a registered dietitian for a personalized plan to improve their overall health.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = `If the individual is male, sedentary, has a BMI between 25 and 29.9, has high blood pressure, does not have diabetes or high cholesterol, and is a vegetarian who can consume dairy, I would advise them to:
  Focus on consuming a variety of fruits, vegetables, whole grains, lean proteins, and low-fat dairy products in appropriate portions.
  Incorporate physical activity into their daily routine to promote heart health, such as walking or other forms of aerobic exercise.
  Limit processed and high-fat foods, as well as excess sodium and added sugars.
  Monitor blood pressure regularly and take prescribed medications as directed by their healthcare provider.
  Consider speaking with a registered dietitian for personalized nutrition recommendations and support.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary male with a BMI between 25 and 29.9, with high blood pressure, no diabetes, no high cholesterol, and who does not consume meat but consumes dairy products, I would recommend the following:
  Increase physical activity level gradually with a combination of strength training and aerobic exercise.
  Incorporate whole grains, legumes, fruits, vegetables, and nuts into daily meals.
  Reduce intake of high-calorie and high-fat foods.
  Limit consumption of processed and sugary foods.
  Monitor blood pressure and take medication as prescribed by a doctor.
  Consider consulting with a registered dietitian to ensure nutritional needs are met.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "Since you are a sedentary male with a BMI between 25 and 29.9, have high blood pressure, do not have diabetes, and have high cholesterol, it's important to make some lifestyle changes to improve your health. You should aim to reduce your intake of saturated and trans fats, which can contribute to high cholesterol, and increase your intake of whole grains, fruits, and vegetables, which can help lower your blood pressure and improve your overall health. Consider cutting back on processed and fried foods, and instead opt for lean proteins like fish, chicken, and legumes. If you're not already doing so, try to engage in regular physical activity, like taking daily walks or doing low-impact exercises. Finally, talk to your doctor about medication options for high blood pressure and high cholesterol, which can help reduce your risk of heart disease and other complications.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "If you are a sedentary male with a BMI between 25 and 29.9, and you have high blood pressure, no diabetes, no high cholesterol, and do not consume vegetables or dairy, I recommend you consider making some lifestyle changes to improve your health. First, try to increase your physical activity levels to help lower your blood pressure and improve overall health. Aim to engage in at least 30 minutes of moderate exercise most days of the week. Second, consider incorporating more vegetables and fruits into your diet. These foods are low in calories and high in nutrients, and can help you maintain a healthy weight and reduce your risk of chronic diseases. Third, limit your intake of processed and high-fat foods, as well as foods high in added sugars and salt, as these can increase your risk of high blood pressure and other health problems. Lastly, it may be helpful to consult with a healthcare professional or registered dietitian to develop a personalized plan to improve your health and manage any existing health conditions.";
}else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = `Based on the information provided, here is some long advice for a male who is sedentary with a BMI between 25 and 29.9, has diabetes and high cholesterol, does not have high blood pressure, and consumes a vegetarian or lacto-vegetarian diet:
  Follow a healthy eating plan that is rich in vegetables, fruits, whole grains, lean protein sources, and healthy fats.
  Limit your intake of saturated and trans fats, cholesterol, sodium, and added sugars.
  Choose lean protein sources, such as fish, skinless poultry, and legumes, instead of red and processed meats.
  Include heart-healthy fats in your diet, such as those found in nuts, seeds, avocado, and fatty fish.
  Monitor your blood sugar levels and take medications as prescribed by your healthcare provider.
  Manage your cholesterol levels by taking medications as prescribed, if necessary, and making dietary changes.
  If you smoke, quit smoking to lower your risk of heart disease and other health problems.
  Aim to engage in regular physical activity, such as walking, cycling, or swimming, for at least 30 minutes per day, most days of the week, or as advised by your healthcare provider.
  Work with your healthcare provider to develop a personalized plan to manage your health, and attend regular check-ups to monitor your progress.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `If a sedentary male has a BMI between 25 and 29.9, no blood pressure issues, diabetes, or high cholesterol, is vegetarian but does not consume dairy products, the following long advice can be given:
  Since you are a vegetarian, it is important to make sure you get enough protein from other sources such as beans, legumes, and nuts.
  Increase your physical activity level to improve your overall health and decrease your risk of chronic diseases such as heart disease and diabetes. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, as well as muscle-strengthening activities at least two days per week.
  Consider consulting with a registered dietitian to ensure that you are meeting your nutrient needs and to develop a meal plan that works for you.
  Avoid processed and high-fat vegetarian options, as they can contribute to weight gain and increase your risk for heart disease and other chronic conditions.
  Limit your intake of added sugars, refined grains, and saturated fats, as these can contribute to weight gain and increase your risk for chronic diseases.
  If you are not already doing so, try to manage stress through techniques such as meditation, yoga, or other relaxation techniques. High levels of stress can contribute to weight gain and increase your risk for chronic diseases.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `For a sedentary male with a BMI between 25 and 29.9 who has no high blood pressure, has diabetes, high cholesterol and doesn't consume vegetables but consumes dairy products, the following advice can be helpful:
  Follow a low-glycemic index diet to manage diabetes better.
  Focus on consuming plant-based whole foods like vegetables, fruits, whole grains, and legumes to lower cholesterol levels and manage diabetes and blood pressure better.
  Limit intake of saturated and trans fats and avoid processed foods to manage high cholesterol levels.
  Engage in physical activity regularly, such as walking, jogging, cycling or swimming, to improve overall health and manage diabetes, cholesterol, and blood pressure levels.
  Consult a doctor and a registered dietitian for a personalized dietary and exercise plan.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `For a male with a sedentary lifestyle, BMI between 25 and 29.9, no high blood pressure, and a history of diabetes and high cholesterol, but not following a vegetarian or lactose-free diet, I would recommend:
  Follow a balanced and healthy diet rich in whole grains, fruits, vegetables, and lean protein sources such as fish and poultry.
  Limit saturated and trans fats, cholesterol, and sodium intake.
  Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 30 minutes a day, most days of the week.
  Control blood sugar levels through medication or lifestyle changes, such as losing weight and consuming fewer carbohydrates.
  Control cholesterol levels through medication or lifestyle changes, such as losing weight, increasing fiber intake, and limiting dietary cholesterol and saturated fat.
  Schedule regular follow-up appointments with a healthcare provider to monitor your health status and adjust your treatment plan as needed.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "Since you are male, have a sedentary lifestyle and have a BMI between 25 and 29.9, you should focus on improving your diet and increasing your physical activity to reduce your risk of developing health problems. As you have normal blood pressure, diabetes and cholesterol, incorporating regular exercise and following a balanced diet with a mix of vegetables, fruits, whole grains, lean protein and low-fat dairy products could be beneficial. Limit your intake of processed foods, sugary drinks and high-fat foods to keep your overall calorie intake in check. Additionally, you can consider consulting a registered dietitian for a personalized meal plan and a healthcare professional for a tailored exercise program.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary Male with BMI between 25 and 29.9, without blood pressure issues, with diabetes, no cholesterol issues, not consuming vegetables and not consuming lactose, my advice would be:
  Consume foods rich in fiber, such as whole grains, beans, fruits, and vegetables.
  Choose lean protein sources, such as skinless chicken, fish, and plant-based protein sources.
  Avoid sugary drinks and limit high-fat and high-calorie foods.
  Check your blood sugar levels regularly and take medications as prescribed by your healthcare provider.
  Incorporate physical activity into your daily routine, such as walking, biking, or swimming. Aim for at least 150 minutes of moderate-intensity aerobic exercise per week.
  Consult with a registered dietitian for a personalized nutrition plan that fits your lifestyle and preferences.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = `For a sedentary Male with BMI between 25 and 29.9, without high blood pressure or cholesterol, and who doesn't have diabetes but does consume dairy, the following advice can be given:
  Increase physical activity level to at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week
  Follow a balanced diet that is rich in vegetables, fruits, whole grains, lean protein sources, and low-fat dairy products
  Limit intake of processed and high-fat foods, sugary drinks, and alcohol
  Monitor blood pressure and cholesterol levels regularly
  Consider regular diabetes screening
  Maintain a healthy weight by continuing to monitor and manage BMI
  Incorporate stress management techniques such as meditation or deep breathing exercises
  Consult with a healthcare professional for personalized advice and support.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "If you are a sedentary male with a BMI between 25 and 29.9, without high blood pressure or diabetes, and with high cholesterol, it is recommended that you consume a balanced diet with plenty of fruits, vegetables, whole grains, and lean protein sources. It is also advised to limit your intake of saturated and trans fats, added sugars, and salt. Incorporating regular physical activity into your daily routine can also help improve your health";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary Male with a BMI between 25 and 29.9, without blood pressure or diabetes issues, and high cholesterol, who is not a vegetarian and does not consume dairy, it is recommended to:
  Reduce the intake of saturated fats and increase the intake of fruits, vegetables, and whole grains.
  Choose lean protein sources such as fish, poultry, legumes, and nuts.
  Engage in regular physical activity, such as brisk walking or cycling, for at least 30 minutes a day.
  Consider consulting a healthcare professional for additional support and guidance.`;
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = " it is important to follow a balanced diet and engage in regular physical activity to maintain a healthy weight and reduce the risk of chronic conditions. If you have any specific health concerns, it is best to consult with a healthcare professional for personalized advice.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "For a sedentary male with a BMI between 25 and 29.9, without high blood pressure, diabetes or high cholesterol, who does not consume meat and consumes dairy, my advice would be to focus on a balanced diet that includes whole grains, fruits and vegetables, legumes, nuts and seeds, and low-fat dairy products to help maintain a healthy weight and reduce the risk of chronic diseases. It is also important to engage in regular physical activity and to get enough sleep each night.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "If a sedentary male with a BMI between 25 and 29.9 has no high blood pressure, no diabetes, no high cholesterol, is not consuming any dairy, and is following a vegetarian diet, it is recommended to focus on incorporating more physical activity into daily routine, and considering incorporating more sources of plant-based protein, fiber, and healthy fats to promote overall health and well-being. Additionally, a healthcare provider should be consulted for personalized advice and monitoring of health markers.";
}
else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "would be to focus on increasing physical activity levels to achieve a healthier weight and to reduce the risk of developing high blood pressure, diabetes, and high cholesterol. Incorporating cardiovascular exercise, strength training, and flexibility exercises, as well as making dietary changes, such as reducing intake of processed foods and increasing intake of whole foods, may be beneficial. It is also important to monitor blood pressure, blood sugar, and cholesterol levels regularly and consult with a healthcare professional for further guidance.";
}
///END MALE OV SEDENTARY RULES///

///START MALE OV MODERATE RULES///
if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a male with moderate activity and being overweight with high blood pressure, diabetes, high cholesterol, and lactose intolerance who follows a vegetarian diet, it is important to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to incorporate low-fat dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods, and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In the absence of high cholesterol, incorporating moderate amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In the absence of high cholesterol, incorporating moderate amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet but has lactose intolerance and does not have diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet and has both lactose intolerance and no diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. Incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with moderate activity and being overweight with high blood pressure, who follows a vegetarian diet and has lactose intolerance but no diabetes or high cholesterol, it is recommended to focus on consuming a variety of plant-based protein sources such as legumes, tofu, tempeh, and seitan, and ensuring adequate intake of essential nutrients such as vitamin B12, iron, and zinc, which may be low in vegetarian diets. Incorporating foods rich in potassium, such as bananas and sweet potatoes, can help to lower blood pressure. It is also recommended to explore lactose-free or plant-based alternatives to dairy products to meet calcium and vitamin D needs. Working with a registered dietitian can help to develop a balanced vegetarian meal plan while addressing any individual nutritional concerns.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the provided conditions, it seems that you are a male with moderate activity level, overweight (with a BMI between 25 and 29.9), and have high blood pressure and diabetes. Depending on your individual health goals and needs, it may be beneficial to work with a registered dietitian to develop a personalized nutrition plan that is appropriate for your health condition. In general, a healthy diet for someone with high blood pressure and diabetes should include plenty of fresh fruits and vegetables, lean protein sources, and whole grains while limiting sodium, added sugars, and saturated fats. It is also important to monitor your carbohydrate intake and distribute them evenly throughout the day to help manage blood sugar levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `If a male's activity level is moderate, their BMI is between 25 and 29.9, they have high blood pressure, and they do not have diabetes or high cholesterol, but they are lactose intolerant, it is important to ensure that they are still consuming enough calcium from other sources, such as leafy greens, fortified non-dairy milks, and calcium-fortified foods, to maintain bone health. It may also be helpful to work with a registered dietitian to ensure they are meeting all of their nutrient needs.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `my advice for a male with moderate activity level, overweight (bmi >= 25 and bmi <= 29.9), with high blood pressure, no diabetes, no high cholesterol, and who is not vegetarian or lactose intolerant, is to focus on a balanced and nutritious diet that is low in sodium and saturated fats. They should consume whole grains, lean protein sources such as fish and skinless poultry, and a variety of fruits and vegetables. It is important for them to control portion sizes and limit their intake of processed and high-calorie foods. Additionally, regular physical activity should be incorporated into their routine to aid in weight loss and improve overall health.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a male with moderate activity, a BMI between 25 and 29.9, and diabetes, high blood pressure, and high cholesterol, who is also vegetarian and lactose-tolerant, but doesn't have high blood pressure, is to focus on a balanced diet with plenty of whole, nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins. It's important to limit processed and high-fat foods, including high-fat dairy products and meat alternatives, and to include regular physical activity as part of a healthy lifestyle. Consult with a registered dietitian for personalized guidance and support.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This condition represents a male with moderate activity level, overweight BMI, no blood pressure issues, but with diabetes and high cholesterol who follows a vegetarian diet and is lactose intolerant. Based on this information, my advice would be to focus on a plant-based, low-glycemic index diet that emphasizes whole, unprocessed foods such as vegetables, fruits, legumes, nuts, and seeds. Foods with a high glycemic index, such as refined carbohydrates and sugars, should be avoided or limited as they can cause a rapid rise in blood sugar levels. It may also be helpful to work with a registered dietitian to develop a personalized meal plan that meets individual needs and preferences while addressing specific health concerns. Additionally, regular physical activity and stress management techniques can also be beneficial for managing diabetes and high cholesterol.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition indicates that a male with a moderate level of physical activity who has a BMI between 25 and 29.9 and does not have high blood pressure but has diabetes and high cholesterol, and is either a lacto-vegetarian or has lactose intolerance. Based on this information, it is recommended to limit the intake of foods high in saturated fats and added sugars, such as processed and fried foods, and instead focus on a balanced diet that includes lean proteins, whole grains, fruits, vegetables, and healthy fats such as those found in nuts and seeds. Additionally, regular physical activity and weight management are also important in managing diabetes and cholesterol levels. Consulting with a registered dietitian can also provide personalized and comprehensive guidance.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `given the presence of diabetes and high cholesterol, it is generally recommended to limit or avoid foods high in saturated and trans fats, added sugars, and refined carbohydrates, and instead opt for a diet rich in fruits, vegetables, whole grains, lean protein sources, and healthy fats such as those found in nuts, seeds, and fatty fish. It may also be beneficial to work with a registered dietitian to develop a personalized meal plan to meet individual needs and goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = ` if you are a male with moderate physical activity, and your BMI falls between 25 and 29.9, and you have diabetes but do not have high blood pressure or high cholesterol, and you are a vegetarian who can consume dairy, I would suggest that you consume a well-balanced diet that includes a variety of whole grains, legumes, fruits, vegetables, low-fat dairy products, and lean sources of protein. It's also important to limit your intake of processed and high-sugar foods and drinks, and to stay hydrated by drinking plenty of water. It's a good idea to work with a registered dietitian to help you develop a personalized nutrition plan to meet your specific needs and goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This code block represents a specific set of criteria for a male individual who has a moderate level of physical activity, is overweight with a BMI between 25 and 29.9, has no blood pressure issues, has diabetes, has no high cholesterol, is vegetarian, and lactose intolerant. As a dietitian, I would recommend a diet that is low in saturated and trans fats, with a focus on whole grains, vegetables, fruits, lean protein sources such as legumes, fish and skinless poultry, and plant-based fats such as olive oil, nuts and seeds. For this individual, it would be particularly important to carefully plan meals to ensure they are getting enough essential nutrients, such as calcium and vitamin B12, which are typically found in dairy products. Alternative sources of these nutrients, such as fortified plant-based milks and supplements, should be considered. It would also be important to monitor blood sugar levels regularly and adjust the diet as needed to keep them under control. Regular physical activity and stress management techniques should also be incorporated into this individual's lifestyle to manage their diabetes effectively.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given conditions, the individual is a male with moderate activity and has a BMI between 25 and 29.9, which indicates he is overweight. He also has no blood pressure issues, but has diabetes and does not consume meat or eggs. It is important for him to consume a well-balanced diet that meets his nutritional needs while also helping to manage his diabetes. He should focus on consuming whole grains, fruits, vegetables, nuts, and seeds to provide his body with essential nutrients and fiber. He may also benefit from incorporating plant-based sources of protein such as legumes and tofu into his diet. It is important for him to monitor his blood sugar levels and consult with a registered dietitian to help create a personalized meal plan. Additionally, regular exercise and weight management should be incorporated into his lifestyle to help manage his diabetes and overall health.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given conditions, you are a moderately active male who is overweight but does not have high blood pressure, does not have diabetes, and is vegetarian and lactose intolerant. However, you have high cholesterol.

To help manage your cholesterol levels, it's recommended to limit your intake of saturated and trans fats, while increasing your intake of fiber-rich foods such as fruits, vegetables, and whole grains. You may also want to consider incorporating heart-healthy fats, such as those found in nuts, seeds, and fatty fish, into your diet. It's important to work with a registered dietitian to develop an individualized plan that meets your specific needs and goals. Additionally, regular physical activity and maintaining a healthy weight can also help improve cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with moderate activity and a BMI between 25 and 29.9, who does not have high blood pressure or diabetes but does have high cholesterol, a plant-based diet rich in fruits, vegetables, whole grains, and legumes may be recommended. In addition, reducing saturated and trans fats, and increasing intake of healthy fats such as omega-3 fatty acids found in fatty fish, nuts, and seeds may help improve cholesterol levels. Regular physical activity and weight management are also important components of managing high cholesterol.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with moderate activity and a BMI between 25 and 29.9 who does not have high blood pressure or diabetes but does have high cholesterol and is either vegetarian or lactose intolerant, I recommend following a balanced diet that is low in saturated and trans fats, high in fiber, and includes plenty of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may be helpful to incorporate cholesterol-lowering foods such as oats, nuts, and fatty fish, as well as plant-based sources of protein like legumes, tofu, and tempeh. Consider working with a registered dietitian to develop a personalized nutrition plan that meets your needs and preferences.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the provided information, as a dietitian, my advice for a male with moderate activity and a BMI between 25 and 29.9, who doesn't have high blood pressure, diabetes or high cholesterol, and is vegetarian and lactose intolerant, is to incorporate a variety of plant-based protein sources in their diet such as beans, lentils, tofu, and nuts to meet their daily protein requirements. It's also important to consume a wide range of fruits and vegetables to get enough vitamins, minerals, and fiber. Choosing lactose-free dairy alternatives, such as soy or almond milk, can provide additional calcium and vitamin D. Lastly, reducing processed and high-fat foods, and cooking with healthy oils like olive or avocado oil can help maintain a healthy weight and reduce the risk of heart disease`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `If you're a moderately active overweight male with no blood pressure issues, diabetes, or cholesterol concerns, but do not consume dairy products and follow a vegetarian diet, then it's important to ensure that you're getting enough protein, calcium, and vitamin D from plant-based sources. Consider incorporating foods such as beans, lentils, tofu, nuts, seeds, and fortified non-dairy milks into your diet to meet your nutritional needs. Additionally, be mindful of portion sizes and choose mostly whole, minimally processed foods. Regular physical activity can also help support your health and weight management goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This condition refers to a moderately active overweight male with no high blood pressure, no diabetes, no high cholesterol, who is not a vegetarian but lactose intolerant. Based on this information, my advice would be to focus on non-dairy sources of protein and calcium, such as nuts, seeds, legumes, and leafy greens. It may also be helpful to try lactose-free dairy products or consider taking a lactase enzyme supplement to aid in digestion. Additionally, maintaining a balanced and varied diet with appropriate portion sizes can aid in weight management. It is also important to engage in regular physical activity and prioritize adequate sleep and stress management. A registered dietitian can provide more personalized recommendations and support.`;
}
///END MALE OV MODERATE RULES///

///START MALE OV VERY RULES///
if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a male with very activity and being overweight with high blood pressure, diabetes, high cholesterol, and lactose intolerance who follows a vegetarian diet, it is important to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to incorporate low-fat dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods, and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In the absence of high cholesterol, incorporating very amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In the absence of high cholesterol, incorporating very amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet but has lactose intolerance and does not have diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a male with very activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet and has both lactose intolerance and no diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. Incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a male with very activity and being overweight with high blood pressure, who follows a vegetarian diet and has lactose intolerance but no diabetes or high cholesterol, it is recommended to focus on consuming a variety of plant-based protein sources such as legumes, tofu, tempeh, and seitan, and ensuring adequate intake of essential nutrients such as vitamin B12, iron, and zinc, which may be low in vegetarian diets. Incorporating foods rich in potassium, such as bananas and sweet potatoes, can help to lower blood pressure. It is also recommended to explore lactose-free or plant-based alternatives to dairy products to meet calcium and vitamin D needs. Working with a registered dietitian can help to develop a balanced vegetarian meal plan while addressing any individual nutritional concerns.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the provided conditions, it seems that you are a male with very activity level, overweight (with a BMI between 25 and 29.9), and have high blood pressure and diabetes. Depending on your individual health goals and needs, it may be beneficial to work with a registered dietitian to develop a personalized nutrition plan that is appropriate for your health condition. In general, a healthy diet for someone with high blood pressure and diabetes should include plenty of fresh fruits and vegetables, lean protein sources, and whole grains while limiting sodium, added sugars, and saturated fats. It is also important to monitor your carbohydrate intake and distribute them evenly throughout the day to help manage blood sugar levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `If a male's activity level is very, their BMI is between 25 and 29.9, they have high blood pressure, and they do not have diabetes or high cholesterol, but they are lactose intolerant, it is important to ensure that they are still consuming enough calcium from other sources, such as leafy greens, fortified non-dairy milks, and calcium-fortified foods, to maintain bone health. It may also be helpful to work with a registered dietitian to ensure they are meeting all of their nutrient needs.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `my advice for a male with very activity level, overweight (bmi >= 25 and bmi <= 29.9), with high blood pressure, no diabetes, no high cholesterol, and who is not vegetarian or lactose intolerant, is to focus on a balanced and nutritious diet that is low in sodium and saturated fats. They should consume whole grains, lean protein sources such as fish and skinless poultry, and a variety of fruits and vegetables. It is important for them to control portion sizes and limit their intake of processed and high-calorie foods. Additionally, regular physical activity should be incorporated into their routine to aid in weight loss and improve overall health.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a male with very activity, a BMI between 25 and 29.9, and diabetes, high blood pressure, and high cholesterol, who is also vegetarian and lactose-tolerant, but doesn't have high blood pressure, is to focus on a balanced diet with plenty of whole, nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins. It's important to limit processed and high-fat foods, including high-fat dairy products and meat alternatives, and to include regular physical activity as part of a healthy lifestyle. Consult with a registered dietitian for personalized guidance and support.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This condition represents a male with very activity level, overweight BMI, no blood pressure issues, but with diabetes and high cholesterol who follows a vegetarian diet and is lactose intolerant. Based on this information, my advice would be to focus on a plant-based, low-glycemic index diet that emphasizes whole, unprocessed foods such as vegetables, fruits, legumes, nuts, and seeds. Foods with a high glycemic index, such as refined carbohydrates and sugars, should be avoided or limited as they can cause a rapid rise in blood sugar levels. It may also be helpful to work with a registered dietitian to develop a personalized meal plan that meets individual needs and preferences while addressing specific health concerns. Additionally, regular physical activity and stress management techniques can also be beneficial for managing diabetes and high cholesterol.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition indicates that a male with a very level of physical activity who has a BMI between 25 and 29.9 and does not have high blood pressure but has diabetes and high cholesterol, and is either a lacto-vegetarian or has lactose intolerance. Based on this information, it is recommended to limit the intake of foods high in saturated fats and added sugars, such as processed and fried foods, and instead focus on a balanced diet that includes lean proteins, whole grains, fruits, vegetables, and healthy fats such as those found in nuts and seeds. Additionally, regular physical activity and weight management are also important in managing diabetes and cholesterol levels. Consulting with a registered dietitian can also provide personalized and comprehensive guidance.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `given the presence of diabetes and high cholesterol, it is generally recommended to limit or avoid foods high in saturated and trans fats, added sugars, and refined carbohydrates, and instead opt for a diet rich in fruits, vegetables, whole grains, lean protein sources, and healthy fats such as those found in nuts, seeds, and fatty fish. It may also be beneficial to work with a registered dietitian to develop a personalized meal plan to meet individual needs and goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = ` if you are a male with very physical activity, and your BMI falls between 25 and 29.9, and you have diabetes but do not have high blood pressure or high cholesterol, and you are a vegetarian who can consume dairy, I would suggest that you consume a well-balanced diet that includes a variety of whole grains, legumes, fruits, vegetables, low-fat dairy products, and lean sources of protein. It's also important to limit your intake of processed and high-sugar foods and drinks, and to stay hydrated by drinking plenty of water. It's a good idea to work with a registered dietitian to help you develop a personalized nutrition plan to meet your specific needs and goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This code block represents a specific set of criteria for a male individual who has a very level of physical activity, is overweight with a BMI between 25 and 29.9, has no blood pressure issues, has diabetes, has no high cholesterol, is vegetarian, and lactose intolerant. As a dietitian, I would recommend a diet that is low in saturated and trans fats, with a focus on whole grains, vegetables, fruits, lean protein sources such as legumes, fish and skinless poultry, and plant-based fats such as olive oil, nuts and seeds. For this individual, it would be particularly important to carefully plan meals to ensure they are getting enough essential nutrients, such as calcium and vitamin B12, which are typically found in dairy products. Alternative sources of these nutrients, such as fortified plant-based milks and supplements, should be considered. It would also be important to monitor blood sugar levels regularly and adjust the diet as needed to keep them under control. Regular physical activity and stress management techniques should also be incorporated into this individual's lifestyle to manage their diabetes effectively.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given conditions, the individual is a male with very activity and has a BMI between 25 and 29.9, which indicates he is overweight. He also has no blood pressure issues, but has diabetes and does not consume meat or eggs. It is important for him to consume a well-balanced diet that meets his nutritional needs while also helping to manage his diabetes. He should focus on consuming whole grains, fruits, vegetables, nuts, and seeds to provide his body with essential nutrients and fiber. He may also benefit from incorporating plant-based sources of protein such as legumes and tofu into his diet. It is important for him to monitor his blood sugar levels and consult with a registered dietitian to help create a personalized meal plan. Additionally, regular exercise and weight management should be incorporated into his lifestyle to help manage his diabetes and overall health.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given conditions, you are a veryly active male who is overweight but does not have high blood pressure, does not have diabetes, and is vegetarian and lactose intolerant. However, you have high cholesterol.

To help manage your cholesterol levels, it's recommended to limit your intake of saturated and trans fats, while increasing your intake of fiber-rich foods such as fruits, vegetables, and whole grains. You may also want to consider incorporating heart-healthy fats, such as those found in nuts, seeds, and fatty fish, into your diet. It's important to work with a registered dietitian to develop an individualized plan that meets your specific needs and goals. Additionally, regular physical activity and maintaining a healthy weight can also help improve cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with very activity and a BMI between 25 and 29.9, who does not have high blood pressure or diabetes but does have high cholesterol, a plant-based diet rich in fruits, vegetables, whole grains, and legumes may be recommended. In addition, reducing saturated and trans fats, and increasing intake of healthy fats such as omega-3 fatty acids found in fatty fish, nuts, and seeds may help improve cholesterol levels. Regular physical activity and weight management are also important components of managing high cholesterol.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with very activity and a BMI between 25 and 29.9 who does not have high blood pressure or diabetes but does have high cholesterol and is either vegetarian or lactose intolerant, I recommend following a balanced diet that is low in saturated and trans fats, high in fiber, and includes plenty of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may be helpful to incorporate cholesterol-lowering foods such as oats, nuts, and fatty fish, as well as plant-based sources of protein like legumes, tofu, and tempeh. Consider working with a registered dietitian to develop a personalized nutrition plan that meets your needs and preferences.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the provided information, as a dietitian, my advice for a male with very activity and a BMI between 25 and 29.9, who doesn't have high blood pressure, diabetes or high cholesterol, and is vegetarian and lactose intolerant, is to incorporate a variety of plant-based protein sources in their diet such as beans, lentils, tofu, and nuts to meet their daily protein requirements. It's also important to consume a wide range of fruits and vegetables to get enough vitamins, minerals, and fiber. Choosing lactose-free dairy alternatives, such as soy or almond milk, can provide additional calcium and vitamin D. Lastly, reducing processed and high-fat foods, and cooking with healthy oils like olive or avocado oil can help maintain a healthy weight and reduce the risk of heart disease`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `If you're a veryly active overweight male with no blood pressure issues, diabetes, or cholesterol concerns, but do not consume dairy products and follow a vegetarian diet, then it's important to ensure that you're getting enough protein, calcium, and vitamin D from plant-based sources. Consider incorporating foods such as beans, lentils, tofu, nuts, seeds, and fortified non-dairy milks into your diet to meet your nutritional needs. Additionally, be mindful of portion sizes and choose mostly whole, minimally processed foods. Regular physical activity can also help support your health and weight management goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This condition refers to a veryly active overweight male with no high blood pressure, no diabetes, no high cholesterol, who is not a vegetarian but lactose intolerant. Based on this information, my advice would be to focus on non-dairy sources of protein and calcium, such as nuts, seeds, legumes, and leafy greens. It may also be helpful to try lactose-free dairy products or consider taking a lactase enzyme supplement to aid in digestion. Additionally, maintaining a balanced and varied diet with appropriate portion sizes can aid in weight management. It is also important to engage in regular physical activity and prioritize adequate sleep and stress management. A registered dietitian can provide more personalized recommendations and support.`;
}
///END MALE OV VERY RULESS///

///START MALE OB SEDENTARY RULES////
if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a dietitian, it is important to take a comprehensive approach to manage your health conditions. Being a sedentary male with a BMI of 30 or higher and having diabetes, high blood pressure, high cholesterol, and lactose intolerance means that you are at increased risk for various health complications, such as heart disease, stroke, and kidney disease.
It is essential to follow a healthy eating pattern that can help control your blood glucose, blood pressure, and lipid levels, and aid in weight loss. As a vegetarian, you should focus on consuming a variety of plant-based protein sources, such as legumes, nuts, seeds, soy products, and whole grains. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are lactose intolerant, you can opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D. It is also important to maintain adequate hydration by drinking plenty of water and other low-calorie fluids.
It is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight. This can also help reduce your risk of developing heart disease and other health complications.
In conclusion, it is essential to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. By adopting a healthy eating pattern, engaging in regular physical activity, and making other lifestyle modifications, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being a vegetarian and lactose intolerant, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a lactose intolerant vegetarian, it is important to consume a variety of plant-based protein sources such as legumes, nuts, seeds, soy products, and whole grains to meet your protein requirements. You can also opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your calcium needs.
Focus on consuming non-starchy vegetables, fruits, and whole grains, which provide you with the necessary vitamins, minerals, and fiber. It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, and instead choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Additionally, it is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and a vegetarian.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also consuming dairy products but not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are not lactose intolerant, you can consume dairy products such as milk, cheese, and yogurt as a source of calcium and other essential nutrients. However, it is important to choose low-fat or fat-free dairy products to reduce your saturated fat intake.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite not being a vegetarian but lactose tolerant.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being lactose intolerant and not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
Since you are lactose intolerant, you should avoid consuming foods that contain lactose, such as milk, cheese, and yogurt. Instead, you can choose lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your nutrient needs.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and not following a vegetarian diet.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a sedentary male with a BMI of 30 or higher, diabetes, high blood pressure, and a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your health conditions effectively.
To ensure you are consuming enough protein, iron, and other essential nutrients, incorporate a variety of plant-based protein sources, iron-rich foods, and low-fat or non-fat dairy products. Focus on non-starchy vegetables, fruits, whole grains, and healthy fats, while limiting your intake of added sugars, refined carbohydrates, and saturated and trans fats.
Engage in regular physical activity for at least 150 minutes per week to help reduce your risk of heart disease and other health complications. Work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or higher and have diabetes, high blood pressure, and are a vegetarian who does not consume dairy products, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a vegetarian, it is important to ensure that you are consuming enough protein, iron, and other essential nutrients. You can do this by incorporating a variety of plant-based protein sources, such as legumes, tofu, tempeh, nuts, and seeds. Additionally, consuming iron-rich foods, such as leafy green vegetables, whole grains, and fortified cereals, can help meet your iron needs.
Since you do not consume dairy products, it is important to ensure that you are getting enough calcium and vitamin D. You can do this by incorporating plant-based milk alternatives fortified with these nutrients, as well as consuming calcium-rich foods such as leafy green vegetables, nuts, and seeds.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on non-starchy vegetables, fruits, whole grains, and healthy fats, such as avocados, nuts, and seeds. These foods provide essential vitamins, minerals, fiber, and healthy fats that can help manage your health conditions.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a dietitian, if you are a sedentary male with a BMI of 30 or more, diabetes, high blood pressure, and lactose intolerance but not cholesterol issues, it is important to focus on a well-balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources.
Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = ` if you are a sedentary male with a BMI of 30 or more, diabetes, and high blood pressure, but without cholesterol or lactose issues, and not following a vegetarian diet, it is important to focus on a healthy, balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources. Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial.
In addition, it is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a vegetarian diet with lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a lactose-free vegetarian diet, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, high cholesterol, and lactose intolerance, but not following a vegetarian diet, it is important to focus on a well-balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and high cholesterol, but without diabetes and lactose or vegetarian issues, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and following a vegetarian diet with lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and following a vegetarian diet without lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and without diabetes or high cholesterol but consuming lactose, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It is also important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, high blood pressure, and without diabetes, high cholesterol, and following a non-vegetarian diet without lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. Reducing your intake of red meat and processed meats, as well as limiting your intake of alcohol, can also be helpful in managing heart health. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet with lactose consumption but without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish. For lactose consumption, alternative sources of calcium such as fortified plant-based milks, and calcium supplements if needed, can be considered.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet without lactose consumption and without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish.
For lactose intolerance, alternative sources of calcium such as fortified plant-based milks, calcium-fortified tofu, or leafy green vegetables can be considered. Additionally, it is important to ensure adequate intake of vitamin D, which can be obtained from fatty fish, egg yolks, or supplements.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a sedentary male with a BMI of 30 or greater, no high blood pressure but with diabetes and high cholesterol, and who is not a vegetarian but has lactose intolerance, here are some dietary recommendations:
Reduce intake of saturated and trans fats: Choose lean meats, fish, and poultry without the skin, and avoid fried foods, baked goods, and processed snacks that contain high amounts of unhealthy fats.
Control portion sizes: Eating smaller, more frequent meals throughout the day can help manage blood sugar levels and reduce the risk of overeating. Use measuring cups or a food scale to keep portions in check.
Choose complex carbohydrates: Focus on whole grains, fruits, vegetables, and legumes, which are high in fiber and important nutrients. These foods can help regulate blood sugar levels and promote healthy digestion.
Limit sugar and salt: Avoid sugary drinks and desserts, and limit the amount of added salt in your diet. Look for low-sodium options and try flavoring foods with herbs and spices instead.
Consider lactose-free dairy alternatives: If lactose intolerance is an issue, try lactose-free or plant-based milk and yogurt alternatives that are fortified with calcium and vitamin D.
It's important to work with a registered dietitian to develop a personalized meal plan that meets your individual needs and preferences. Additionally, engaging in regular physical activity can also help manage diabetes and improve overall health.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if a male patient has a sedentary lifestyle, BMI greater than or equal to 30, no high blood pressure, and has diabetes and high cholesterol but is not a vegetarian and can tolerate lactose, I would recommend a diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should also limit their intake of processed and high-fat foods and focus on consuming lean protein sources, such as poultry and fish. In addition, they should incorporate whole grains, fruits, and vegetables into their diet. If they consume dairy products, I would recommend low-fat or non-fat options. They should also be mindful of their portion sizes and aim to consume a balanced diet that meets their individual nutrient needs.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if a male patient has a sedentary lifestyle, BMI greater than or equal to 30, no high blood pressure, has diabetes but does not have high cholesterol and is a vegetarian and can tolerate lactose, I would recommend a plant-based diet that is rich in whole grains, legumes, fruits, and vegetables. They should focus on consuming foods that are high in fiber, vitamins, and minerals, and limit their intake of processed and high-fat foods. They should also consider incorporating low-fat dairy products or plant-based milk alternatives into their diet for additional nutrients such as calcium and vitamin D. It is important to monitor their blood sugar levels and work with a healthcare provider to adjust their medication as needed to maintain healthy blood sugar levels.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This set of conditions describes a sedentary male with a BMI greater than or equal to 30, without high blood pressure, with diabetes, no high cholesterol, who is either vegetarian or lactose intolerant. Here is some advice that could be useful:
Manage your diabetes: If you have diabetes, it is important to manage your blood sugar levels through diet, exercise, and medication. Consult with a healthcare professional, such as a doctor or dietitian, to develop a personalized diabetes management plan.
Focus on weight loss: Given your high BMI and sedentary lifestyle, losing weight can help improve your overall health and reduce your risk of diabetes-related complications. Aim for a healthy rate of weight loss by making sustainable changes to your diet and increasing your physical activity level.
Eat a balanced diet: Whether you are vegetarian or lactose intolerant, it is important to consume a balanced diet that meets your nutritional needs. Focus on incorporating whole, nutrient-dense foods such as fruits, vegetables, whole grains, lean protein sources, and healthy fats. Avoid highly processed or high-sugar foods, as these can negatively impact your blood sugar levels.
Consider seeing a registered dietitian: A registered dietitian can provide personalized nutrition advice that takes into account your individual health status and dietary preferences. They can also help you develop a diabetes-friendly meal plan and make sustainable changes to your diet.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a sedentary male with BMI >= 30, high blood pressure, and diabetes, it is advisable to avoid high cholesterol foods and to follow a vegetarian diet that is also lactose-free. A diet rich in fruits, vegetables, and whole grains, along with lean protein sources such as beans and legumes, can help control blood sugar and blood pressure. It is important to monitor blood glucose levels regularly and work with a healthcare professional to manage diabetes`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a sedentary male with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Increase the intake of fruits and vegetables to ensure adequate intake of essential vitamins, minerals, and fiber.
Include plant-based sources of protein such as beans, lentils, nuts, and seeds in your meals.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary male with a BMI of 30 or higher and do not have high blood pressure or diabetes, but have high cholesterol and are a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your cholesterol levels.
It is recommended to follow a vegetarian diet that includes a variety of fruits, vegetables, whole grains, legumes, and healthy fats. These foods provide a range of nutrients that can help improve your cholesterol levels.
You should focus on incorporating sources of soluble fiber such as oats, barley, beans, and lentils, as these have been shown to lower LDL (bad) cholesterol. It is also important to include foods that are rich in healthy fats, such as nuts, seeds, avocado, and olive oil, as these can help improve cholesterol levels.
In addition to a healthy diet, regular physical activity can also help improve cholesterol levels. Aim for at least 150 minutes of moderate-intensity exercise, such as brisk walking, cycling, or swimming, per week.
It is also important to limit your intake of saturated and trans fats, which can increase cholesterol levels. Avoid or limit processed and fried foods, as well as full-fat dairy products.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a sedentary male with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a sedentary male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Monitor vitamin B12 levels and consider taking a supplement if necessary as it is not naturally present in plant-based foods.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `my advice for a sedentary male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegan diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds, as well as tofu and tempeh.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate plant-based sources of calcium such as fortified plant-based milk, tofu, and dark leafy greens.
Monitor vitamin B12 levels and consider taking a supplement as it is not naturally present in plant-based foods.
Consider including sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts to support heart health.
Limit processed and high-fat vegan foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance to ensure that nutrient needs are met on a vegan diet.`;
}
else if (gender === "Male" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a sedentary male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Monitor portion sizes to manage calorie intake and promote weight loss.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
///END MALE OB SEDENTARY///

////START MALE OB LIGHT RULES///
if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a dietitian, it is important to take a comprehensive approach to manage your health conditions. Being a lightly male with a BMI of 30 or higher and having diabetes, high blood pressure, high cholesterol, and lactose intolerance means that you are at increased risk for various health complications, such as heart disease, stroke, and kidney disease.
It is essential to follow a healthy eating pattern that can help control your blood glucose, blood pressure, and lipid levels, and aid in weight loss. As a vegetarian, you should focus on consuming a variety of plant-based protein sources, such as legumes, nuts, seeds, soy products, and whole grains. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are lactose intolerant, you can opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D. It is also important to maintain adequate hydration by drinking plenty of water and other low-calorie fluids.
It is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight. This can also help reduce your risk of developing heart disease and other health complications.
In conclusion, it is essential to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. By adopting a healthy eating pattern, engaging in regular physical activity, and making other lifestyle modifications, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being a vegetarian and lactose intolerant, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a lactose intolerant vegetarian, it is important to consume a variety of plant-based protein sources such as legumes, nuts, seeds, soy products, and whole grains to meet your protein requirements. You can also opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your calcium needs.
Focus on consuming non-starchy vegetables, fruits, and whole grains, which provide you with the necessary vitamins, minerals, and fiber. It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, and instead choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Additionally, it is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and a vegetarian.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also consuming dairy products but not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are not lactose intolerant, you can consume dairy products such as milk, cheese, and yogurt as a source of calcium and other essential nutrients. However, it is important to choose low-fat or fat-free dairy products to reduce your saturated fat intake.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite not being a vegetarian but lactose tolerant.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being lactose intolerant and not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
Since you are lactose intolerant, you should avoid consuming foods that contain lactose, such as milk, cheese, and yogurt. Instead, you can choose lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your nutrient needs.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and not following a vegetarian diet.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a lightly male with a BMI of 30 or higher, diabetes, high blood pressure, and a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your health conditions effectively.
To ensure you are consuming enough protein, iron, and other essential nutrients, incorporate a variety of plant-based protein sources, iron-rich foods, and low-fat or non-fat dairy products. Focus on non-starchy vegetables, fruits, whole grains, and healthy fats, while limiting your intake of added sugars, refined carbohydrates, and saturated and trans fats.
Engage in regular physical activity for at least 150 minutes per week to help reduce your risk of heart disease and other health complications. Work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or higher and have diabetes, high blood pressure, and are a vegetarian who does not consume dairy products, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a vegetarian, it is important to ensure that you are consuming enough protein, iron, and other essential nutrients. You can do this by incorporating a variety of plant-based protein sources, such as legumes, tofu, tempeh, nuts, and seeds. Additionally, consuming iron-rich foods, such as leafy green vegetables, whole grains, and fortified cereals, can help meet your iron needs.
Since you do not consume dairy products, it is important to ensure that you are getting enough calcium and vitamin D. You can do this by incorporating plant-based milk alternatives fortified with these nutrients, as well as consuming calcium-rich foods such as leafy green vegetables, nuts, and seeds.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on non-starchy vegetables, fruits, whole grains, and healthy fats, such as avocados, nuts, and seeds. These foods provide essential vitamins, minerals, fiber, and healthy fats that can help manage your health conditions.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a dietitian, if you are a lightly male with a BMI of 30 or more, diabetes, high blood pressure, and lactose intolerance but not cholesterol issues, it is important to focus on a well-balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources.
Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = ` if you are a lightly male with a BMI of 30 or more, diabetes, and high blood pressure, but without cholesterol or lactose issues, and not following a vegetarian diet, it is important to focus on a healthy, balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources. Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial.
In addition, it is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a vegetarian diet with lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a lactose-free vegetarian diet, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, high cholesterol, and lactose intolerance, but not following a vegetarian diet, it is important to focus on a well-balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and high cholesterol, but without diabetes and lactose or vegetarian issues, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and following a vegetarian diet with lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and following a vegetarian diet without lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and without diabetes or high cholesterol but consuming lactose, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It is also important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or more, high blood pressure, and without diabetes, high cholesterol, and following a non-vegetarian diet without lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. Reducing your intake of red meat and processed meats, as well as limiting your intake of alcohol, can also be helpful in managing heart health. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly male with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet with lactose consumption but without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish. For lactose consumption, alternative sources of calcium such as fortified plant-based milks, and calcium supplements if needed, can be considered.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet without lactose consumption and without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish.
For lactose intolerance, alternative sources of calcium such as fortified plant-based milks, calcium-fortified tofu, or leafy green vegetables can be considered. Additionally, it is important to ensure adequate intake of vitamin D, which can be obtained from fatty fish, egg yolks, or supplements.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a lightly male with a BMI of 30 or greater, no high blood pressure but with diabetes and high cholesterol, and who is not a vegetarian but has lactose intolerance, here are some dietary recommendations:
Reduce intake of saturated and trans fats: Choose lean meats, fish, and poultry without the skin, and avoid fried foods, baked goods, and processed snacks that contain high amounts of unhealthy fats.
Control portion sizes: Eating smaller, more frequent meals throughout the day can help manage blood sugar levels and reduce the risk of overeating. Use measuring cups or a food scale to keep portions in check.
Choose complex carbohydrates: Focus on whole grains, fruits, vegetables, and legumes, which are high in fiber and important nutrients. These foods can help regulate blood sugar levels and promote healthy digestion.
Limit sugar and salt: Avoid sugary drinks and desserts, and limit the amount of added salt in your diet. Look for low-sodium options and try flavoring foods with herbs and spices instead.
Consider lactose-free dairy alternatives: If lactose intolerance is an issue, try lactose-free or plant-based milk and yogurt alternatives that are fortified with calcium and vitamin D.
It's important to work with a registered dietitian to develop a personalized meal plan that meets your individual needs and preferences. Additionally, engaging in regular physical activity can also help manage diabetes and improve overall health.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if a male patient has a lightly lifestyle, BMI greater than or equal to 30, no high blood pressure, and has diabetes and high cholesterol but is not a vegetarian and can tolerate lactose, I would recommend a diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should also limit their intake of processed and high-fat foods and focus on consuming lean protein sources, such as poultry and fish. In addition, they should incorporate whole grains, fruits, and vegetables into their diet. If they consume dairy products, I would recommend low-fat or non-fat options. They should also be mindful of their portion sizes and aim to consume a balanced diet that meets their individual nutrient needs.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if a male patient has a lightly lifestyle, BMI greater than or equal to 30, no high blood pressure, has diabetes but does not have high cholesterol and is a vegetarian and can tolerate lactose, I would recommend a plant-based diet that is rich in whole grains, legumes, fruits, and vegetables. They should focus on consuming foods that are high in fiber, vitamins, and minerals, and limit their intake of processed and high-fat foods. They should also consider incorporating low-fat dairy products or plant-based milk alternatives into their diet for additional nutrients such as calcium and vitamin D. It is important to monitor their blood sugar levels and work with a healthcare provider to adjust their medication as needed to maintain healthy blood sugar levels.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This set of conditions describes a lightly male with a BMI greater than or equal to 30, without high blood pressure, with diabetes, no high cholesterol, who is either vegetarian or lactose intolerant. Here is some advice that could be useful:
Manage your diabetes: If you have diabetes, it is important to manage your blood sugar levels through diet, exercise, and medication. Consult with a healthcare professional, such as a doctor or dietitian, to develop a personalized diabetes management plan.
Focus on weight loss: Given your high BMI and lightly lifestyle, losing weight can help improve your overall health and reduce your risk of diabetes-related complications. Aim for a healthy rate of weight loss by making sustainable changes to your diet and increasing your physical activity level.
Eat a balanced diet: Whether you are vegetarian or lactose intolerant, it is important to consume a balanced diet that meets your nutritional needs. Focus on incorporating whole, nutrient-dense foods such as fruits, vegetables, whole grains, lean protein sources, and healthy fats. Avoid highly processed or high-sugar foods, as these can negatively impact your blood sugar levels.
Consider seeing a registered dietitian: A registered dietitian can provide personalized nutrition advice that takes into account your individual health status and dietary preferences. They can also help you develop a diabetes-friendly meal plan and make sustainable changes to your diet.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a lightly male with BMI >= 30, high blood pressure, and diabetes, it is advisable to avoid high cholesterol foods and to follow a vegetarian diet that is also lactose-free. A diet rich in fruits, vegetables, and whole grains, along with lean protein sources such as beans and legumes, can help control blood sugar and blood pressure. It is important to monitor blood glucose levels regularly and work with a healthcare professional to manage diabetes`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a lightly male with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Increase the intake of fruits and vegetables to ensure adequate intake of essential vitamins, minerals, and fiber.
Include plant-based sources of protein such as beans, lentils, nuts, and seeds in your meals.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly male with a BMI of 30 or higher and do not have high blood pressure or diabetes, but have high cholesterol and are a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your cholesterol levels.
It is recommended to follow a vegetarian diet that includes a variety of fruits, vegetables, whole grains, legumes, and healthy fats. These foods provide a range of nutrients that can help improve your cholesterol levels.
You should focus on incorporating sources of soluble fiber such as oats, barley, beans, and lentils, as these have been shown to lower LDL (bad) cholesterol. It is also important to include foods that are rich in healthy fats, such as nuts, seeds, avocado, and olive oil, as these can help improve cholesterol levels.
In addition to a healthy diet, regular physical activity can also help improve cholesterol levels. Aim for at least 150 minutes of moderate-intensity exercise, such as brisk walking, cycling, or swimming, per week.
It is also important to limit your intake of saturated and trans fats, which can increase cholesterol levels. Avoid or limit processed and fried foods, as well as full-fat dairy products.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a lightly male with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a lightly male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Monitor vitamin B12 levels and consider taking a supplement if necessary as it is not naturally present in plant-based foods.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `my advice for a lightly male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegan diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds, as well as tofu and tempeh.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate plant-based sources of calcium such as fortified plant-based milk, tofu, and dark leafy greens.
Monitor vitamin B12 levels and consider taking a supplement as it is not naturally present in plant-based foods.
Consider including sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts to support heart health.
Limit processed and high-fat vegan foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance to ensure that nutrient needs are met on a vegan diet.`;
}
else if (gender === "Male" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a lightly male with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Monitor portion sizes to manage calorie intake and promote weight loss.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
///END MALE OB LIGHT RULESS///

///START MALE OB MODERATE RULES//
if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `my advice for a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, high cholesterol, is a vegetarian, and has lactose intolerance is to follow a balanced and nutritious diet that helps manage their health conditions. This can include consuming high-fiber foods, lean protein sources, healthy fats, and low-glycemic index carbohydrates while limiting saturated and trans fats, added sugars, and sodium. Additionally, incorporating regular physical activity and working with a healthcare provider to manage their health conditions can help improve their overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is a vegetarian but has lactose intolerance, my advice as a dietitian would be to consume a well-planned plant-based diet that meets all the essential nutrient requirements, including calcium, vitamin D, and vitamin B12, which may be lacking in a lactose-free diet. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. Additionally, it is crucial to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is not a vegetarian, but has lactose intolerance, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also essential to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity, along with working with a healthcare provider to manage these health conditions, can also be beneficial.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, and is not a vegetarian and also has lactose intolerance, my advice as a dietitian would be to consume a balanced and varied diet that includes lean protein sources, healthy fats, low-glycemic index carbohydrates, and plenty of fruits and vegetables while avoiding or limiting lactose-containing foods and beverages. Good sources of calcium and vitamin D, which may be lacking in a lactose-free diet, include fortified plant-based milks, dark leafy greens, almonds, and salmon. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions can help improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes and is a vegetarian with lactose intolerance, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. It is also essential to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is a vegetarian, and has lactose intolerance, but does not have high cholesterol, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions effectively can improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is not a vegetarian but has lactose intolerance and does not have high cholesterol, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also important to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity and working with a healthcare provider to manage these health conditions effectively can also be beneficial for overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is also important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian, and has lactose intolerance but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources, such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person has high cholesterol, they should limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian and also lactose intolerant but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. This person should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods, as these can increase cholesterol levels. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, and not lactose intolerant but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes a variety of plant-based protein sources like legumes, nuts, and seeds. This person should also ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which are often found in animal products but can be obtained through fortified plant-based sources or supplements. Additionally, since this person has high blood pressure, they should limit their intake of sodium and include plenty of fruits and vegetables in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a male with moderate activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, not lactose intolerant, but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a well-balanced diet that is rich in a variety of whole plant-based foods. This person should aim for a variety of nutrient-dense foods such as vegetables, fruits, whole grains, legumes, nuts, and seeds. They should make sure to include plant-based protein sources such as tofu, tempeh, and seitan. Additionally, they should ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which can be obtained through fortified plant-based sources or supplements. This person should limit their intake of added sugars, saturated and trans fats, and processed foods. Since this person has high blood pressure, they should also limit their intake of sodium and include plenty of potassium-rich foods such as bananas, avocados, and leafy greens in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `I would recommend that the individual work with a registered dietitian to develop a personalized meal plan that takes into account their lactose intolerance and dietary preferences. It may also be important to limit sodium intake in order to manage their blood pressure. Some options to consider include incorporating more plant-based protein sources, such as beans and lentils, and incorporating calcium-rich non-dairy alternatives, such as fortified almond milk or soy milk, to ensure they are meeting their nutrient needs. It is important for this individual to prioritize regular physical activity and work with their healthcare provider to manage their blood pressure and overall health.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `If you are a male with a moderate activity level and a BMI of 30 or greater, and you have high blood pressure and do not have diabetes or high cholesterol, and you are not a vegetarian or lactose intolerant, it is important to focus on maintaining a healthy and balanced diet. You should aim to incorporate a variety of nutrient-dense foods such as whole grains, lean proteins, fruits, and vegetables while limiting your intake of processed and high-fat foods. It is also important to stay hydrated by drinking plenty of water and to maintain a consistent exercise routine. Additionally, reducing your sodium intake can help to lower your blood pressure and improve overall heart health. It may be helpful to consult with a registered dietitian to develop a personalized nutrition plan that meets your individual needs and goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition indicates that the individual is a moderately active obese male with diabetes, high cholesterol, and is also following a vegetarian diet while not having lactose intolerance. The absence of high blood pressure suggests that managing the other health conditions is the priority. As a dietitian, I would recommend a balanced meal plan that includes plenty of non-starchy vegetables, whole grains, lean proteins such as legumes, and healthy fats such as avocados and nuts. It is also important to limit the intake of saturated and trans fats, added sugars, and salt. A registered dietitian can create a personalized meal plan to meet the individual's specific nutritional needs while also taking into consideration their personal food preferences and cultural background. Additionally, it is recommended to engage in regular physical activity and to work closely with a healthcare provider to manage diabetes and cholesterol levels.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This code block suggests that the person is a male with a BMI greater than or equal to 30, is moderately active, and does not have high blood pressure, but has diabetes, high cholesterol, is a vegetarian and is lactose intolerant. Based on this information, I would advise this individual to eat a well-balanced diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should focus on consuming nutrient-dense foods such as whole grains, fruits, vegetables, legumes, nuts, seeds, and lean sources of protein such as fish, chicken, turkey, and plant-based sources such as tofu and tempeh. They should also choose low-fat dairy alternatives or non-dairy sources of calcium and vitamin D if they are lactose intolerant. It is also important for them to manage their diabetes by monitoring their blood sugar levels regularly, taking medication as prescribed by their healthcare provider, and engaging in regular physical activity. A registered dietitian can provide personalized and specific nutrition recommendations to meet their individual needs and goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition represents a male individual with moderate activity level, having a BMI greater than or equal to 30, without high blood pressure, with diabetes and high cholesterol, being vegetarian but not lactose intolerant.

Based on these criteria, I would recommend a balanced diet that is high in fiber, plant-based protein, and healthy fats. Since the individual is vegetarian, they should consume a variety of protein sources such as beans, lentils, tofu, and tempeh. They should also include plenty of vegetables, fruits, whole grains, and nuts in their diet.

To manage their diabetes and high cholesterol, they should limit their intake of processed foods, added sugars, and saturated fats. Instead, they should focus on healthy fats found in foods like avocados, nuts, and seeds. They should also monitor their blood glucose levels regularly and take any prescribed medication as directed by their healthcare provider.

It's also important to note that since the individual is not lactose intolerant, they could consider incorporating low-fat dairy products into their diet for additional calcium and vitamin D. However, if they choose to avoid dairy, they can get these nutrients from non-dairy sources such as fortified plant milks, leafy greens, and fortified cereals. It's essential to work with a registered dietitian to ensure that their nutritional needs are being met.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `Based on the information provided, it appears that this individual is a moderately active male with obesity, high blood pressure, and a history of diabetes and high cholesterol. They also have dietary restrictions related to being a non-vegetarian and non-lactose intolerant individual. If this is the case, I would recommend that this individual follows a well-balanced, calorie-controlled diet that is low in saturated fat and high in fiber. They should aim to eat a variety of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may also be beneficial for this individual to work with a registered dietitian to help them develop a personalized nutrition plan that meets their specific needs and goals. Additionally, they should prioritize regular physical activity and speak with their healthcare provider about any necessary medical interventions to manage their blood pressure, diabetes, and high cholesterol.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition represents a male with moderate activity level, who is obese with a BMI greater than or equal to 30, has normal blood pressure but has been diagnosed with diabetes and is a vegetarian who can consume lactose. However, they do not have high cholesterol levels.

As an expert dietitian, I would recommend a well-balanced and nutrient-dense diet that is tailored to manage diabetes and support weight loss. This individual should aim to include a variety of colorful vegetables, fruits, whole grains, lean protein sources, and healthy fats in their meals. As a vegetarian, they should ensure they are getting enough protein from plant-based sources like legumes, tofu, tempeh, and nuts, and supplement their diet with vitamin B12 and iron. Additionally, it's important to monitor portion sizes and limit added sugars, refined carbohydrates, and saturated and trans fats. Regular physical activity, adequate hydration, and stress management techniques can also be helpful for managing diabetes and maintaining a healthy weight.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the given conditions, the individual is a moderately active, obese male who has diabetes, normal blood pressure, and does not consume animal products or lactose. It is important for this individual to focus on a diet that is low in added sugars and refined carbohydrates to help manage blood sugar levels. They should consume a variety of plant-based foods, including whole grains, fruits, vegetables, and legumes to provide essential nutrients and fiber. Additionally, they may benefit from incorporating healthy fats, such as nuts, seeds, and avocados into their diet to help promote satiety and manage cholesterol levels. It is important for this individual to work with a registered dietitian to create a personalized nutrition plan that meets their individual needs and preferences.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This individual has diabetes and lactose intolerance, but no high blood pressure or high cholesterol. It's important for them to monitor their blood sugar levels closely and maintain a balanced diet with appropriate carbohydrate and protein intake. Lactose-free dairy products and alternative sources of calcium should be incorporated to ensure adequate nutrient intake. Vegetables, whole grains, lean protein, and healthy fats should be prioritized, while limiting added sugars and processed foods. Regular physical activity, along with a balanced diet, is also important for managing diabetes and maintaining overall health.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `I would recommend this individual to focus on a balanced and heart-healthy diet to manage their high cholesterol levels. This could include reducing saturated and trans fats, increasing fiber-rich whole grains, fruits, vegetables, and lean protein sources such as fish and poultry, and limiting processed and high-sugar foods. Additionally, regular physical activity can help manage weight and improve cholesterol levels. It is also important for this individual to regularly monitor their cholesterol levels and work with a healthcare provider to determine the best approach for managing their cholesterol.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `If you are a male with a moderate activity level and a BMI over 30 who does not have high blood pressure, is not diabetic, is not lactose intolerant, and follows a vegetarian diet but has high cholesterol, it's important to make some dietary changes. You should aim to consume a diet low in saturated and trans fats and high in fiber, such as fruits, vegetables, whole grains, legumes, and lean protein sources like fish or skinless chicken. It's also important to limit your intake of processed foods, sugary drinks, and alcohol, which can contribute to high cholesterol levels. Consulting a registered dietitian can help you create a personalized diet plan that fits your nutritional needs and health goals.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `Based on the information provided, if a male has a moderate activity level, a BMI of 30 or more, does not have high blood pressure or diabetes, but has high cholesterol and is lactose intolerant, the dietitian's advice would be to limit saturated and trans fats in the diet, and to focus on consuming more whole, plant-based foods. Good choices include fruits, vegetables, whole grains, legumes, nuts, and seeds. Low-fat dairy alternatives, such as almond or soy milk, can be included in the diet to provide calcium and other important nutrients. It may also be helpful to work with a registered dietitian to develop a personalized nutrition plan.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given information, it seems like the person is a male with a moderate active lifestyle and an obese body mass index. They do not have high blood pressure or diabetes, and their cholesterol level is low. They are non-vegetarian but may have lactose intolerance.

My advice would be to focus on a balanced diet that is rich in nutrients while being mindful of their lactose intolerance. They should aim to consume a variety of fruits, vegetables, whole grains, and lean protein sources like poultry, fish, and legumes. It is also important for them to limit their intake of saturated and trans fats, added sugars, and processed foods. They may benefit from working with a registered dietitian to develop a personalized nutrition plan to meet their specific needs and goals. Additionally, incorporating regular physical activity into their routine can also help improve their overall health and wellbeing.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `a moderately active male individual with a BMI greater than or equal to 30, who does not have high blood pressure, diabetes or high cholesterol, is vegetarian and lactose intolerant. Based on this, as a dietitian, I would recommend a diet that is high in plant-based proteins such as legumes, tofu, and tempeh to ensure adequate protein intake. Foods rich in calcium such as fortified plant milks, dark leafy greens, and calcium-set tofu should be included to support bone health. Lactose-free dairy alternatives such as soy milk, almond milk, or oat milk can be used to meet calcium and vitamin D needs. It is important to focus on whole grains, fruits, vegetables, and healthy fats such as nuts, seeds, and avocado to ensure balanced nutrition. A consultation with a registered dietitian can be helpful in developing an individualized meal plan to meet specific nutrient needs.`;
}
else if (gender === "Male" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given information, if the individual is a moderately active male with a BMI over 30 and has no history of blood pressure or diabetes, but has high cholesterol and is lactose intolerant, then it is recommended to consume a low-fat diet with no dairy products. It is essential to focus on plant-based protein sources, such as beans, lentils, and soy products, along with whole grains, fruits, and vegetables. Additionally, reducing the intake of saturated and trans fats, processed foods, and sugary drinks is crucial for maintaining a healthy weight and reducing the risk of heart disease. Consulting a registered dietitian to develop a personalized nutrition plan is highly recommended.`;
}
////END MALE OB MODERATE RULES///

///START MALE OB VERY RULES///
if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `my advice for a male with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, high cholesterol, is a vegetarian, and has lactose intolerance is to follow a balanced and nutritious diet that helps manage their health conditions. This can include consuming high-fiber foods, lean protein sources, healthy fats, and low-glycemic index carbohydrates while limiting saturated and trans fats, added sugars, and sodium. Additionally, incorporating regular physical activity and working with a healthcare provider to manage their health conditions can help improve their overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is a vegetarian but has lactose intolerance, my advice as a dietitian would be to consume a well-planned plant-based diet that meets all the essential nutrient requirements, including calcium, vitamin D, and vitamin B12, which may be lacking in a lactose-free diet. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. Additionally, it is crucial to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is not a vegetarian, but has lactose intolerance, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also essential to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity, along with working with a healthcare provider to manage these health conditions, can also be beneficial.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, and is not a vegetarian and also has lactose intolerance, my advice as a dietitian would be to consume a balanced and varied diet that includes lean protein sources, healthy fats, low-glycemic index carbohydrates, and plenty of fruits and vegetables while avoiding or limiting lactose-containing foods and beverages. Good sources of calcium and vitamin D, which may be lacking in a lactose-free diet, include fortified plant-based milks, dark leafy greens, almonds, and salmon. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions can help improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes and is a vegetarian with lactose intolerance, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. It is also essential to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is a vegetarian, and has lactose intolerance, but does not have high cholesterol, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions effectively can improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is not a vegetarian but has lactose intolerance and does not have high cholesterol, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also important to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity and working with a healthcare provider to manage these health conditions effectively can also be beneficial for overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is also important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian, and has lactose intolerance but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources, such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person has high cholesterol, they should limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian and also lactose intolerant but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. This person should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods, as these can increase cholesterol levels. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, and not lactose intolerant but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes a variety of plant-based protein sources like legumes, nuts, and seeds. This person should also ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which are often found in animal products but can be obtained through fortified plant-based sources or supplements. Additionally, since this person has high blood pressure, they should limit their intake of sodium and include plenty of fruits and vegetables in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a male with very activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, not lactose intolerant, but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a well-balanced diet that is rich in a variety of whole plant-based foods. This person should aim for a variety of nutrient-dense foods such as vegetables, fruits, whole grains, legumes, nuts, and seeds. They should make sure to include plant-based protein sources such as tofu, tempeh, and seitan. Additionally, they should ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which can be obtained through fortified plant-based sources or supplements. This person should limit their intake of added sugars, saturated and trans fats, and processed foods. Since this person has high blood pressure, they should also limit their intake of sodium and include plenty of potassium-rich foods such as bananas, avocados, and leafy greens in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `I would recommend that the individual work with a registered dietitian to develop a personalized meal plan that takes into account their lactose intolerance and dietary preferences. It may also be important to limit sodium intake in order to manage their blood pressure. Some options to consider include incorporating more plant-based protein sources, such as beans and lentils, and incorporating calcium-rich non-dairy alternatives, such as fortified almond milk or soy milk, to ensure they are meeting their nutrient needs. It is important for this individual to prioritize regular physical activity and work with their healthcare provider to manage their blood pressure and overall health.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `If you are a male with a very activity level and a BMI of 30 or greater, and you have high blood pressure and do not have diabetes or high cholesterol, and you are not a vegetarian or lactose intolerant, it is important to focus on maintaining a healthy and balanced diet. You should aim to incorporate a variety of nutrient-dense foods such as whole grains, lean proteins, fruits, and vegetables while limiting your intake of processed and high-fat foods. It is also important to stay hydrated by drinking plenty of water and to maintain a consistent exercise routine. Additionally, reducing your sodium intake can help to lower your blood pressure and improve overall heart health. It may be helpful to consult with a registered dietitian to develop a personalized nutrition plan that meets your individual needs and goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition indicates that the individual is a veryly active obese male with diabetes, high cholesterol, and is also following a vegetarian diet while not having lactose intolerance. The absence of high blood pressure suggests that managing the other health conditions is the priority. As a dietitian, I would recommend a balanced meal plan that includes plenty of non-starchy vegetables, whole grains, lean proteins such as legumes, and healthy fats such as avocados and nuts. It is also important to limit the intake of saturated and trans fats, added sugars, and salt. A registered dietitian can create a personalized meal plan to meet the individual's specific nutritional needs while also taking into consideration their personal food preferences and cultural background. Additionally, it is recommended to engage in regular physical activity and to work closely with a healthcare provider to manage diabetes and cholesterol levels.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This code block suggests that the person is a male with a BMI greater than or equal to 30, is veryly active, and does not have high blood pressure, but has diabetes, high cholesterol, is a vegetarian and is lactose intolerant. Based on this information, I would advise this individual to eat a well-balanced diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should focus on consuming nutrient-dense foods such as whole grains, fruits, vegetables, legumes, nuts, seeds, and lean sources of protein such as fish, chicken, turkey, and plant-based sources such as tofu and tempeh. They should also choose low-fat dairy alternatives or non-dairy sources of calcium and vitamin D if they are lactose intolerant. It is also important for them to manage their diabetes by monitoring their blood sugar levels regularly, taking medication as prescribed by their healthcare provider, and engaging in regular physical activity. A registered dietitian can provide personalized and specific nutrition recommendations to meet their individual needs and goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition represents a male individual with very activity level, having a BMI greater than or equal to 30, without high blood pressure, with diabetes and high cholesterol, being vegetarian but not lactose intolerant.

Based on these criteria, I would recommend a balanced diet that is high in fiber, plant-based protein, and healthy fats. Since the individual is vegetarian, they should consume a variety of protein sources such as beans, lentils, tofu, and tempeh. They should also include plenty of vegetables, fruits, whole grains, and nuts in their diet.

To manage their diabetes and high cholesterol, they should limit their intake of processed foods, added sugars, and saturated fats. Instead, they should focus on healthy fats found in foods like avocados, nuts, and seeds. They should also monitor their blood glucose levels regularly and take any prescribed medication as directed by their healthcare provider.

It's also important to note that since the individual is not lactose intolerant, they could consider incorporating low-fat dairy products into their diet for additional calcium and vitamin D. However, if they choose to avoid dairy, they can get these nutrients from non-dairy sources such as fortified plant milks, leafy greens, and fortified cereals. It's essential to work with a registered dietitian to ensure that their nutritional needs are being met.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `Based on the information provided, it appears that this individual is a veryly active male with obesity, high blood pressure, and a history of diabetes and high cholesterol. They also have dietary restrictions related to being a non-vegetarian and non-lactose intolerant individual. If this is the case, I would recommend that this individual follows a well-balanced, calorie-controlled diet that is low in saturated fat and high in fiber. They should aim to eat a variety of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may also be beneficial for this individual to work with a registered dietitian to help them develop a personalized nutrition plan that meets their specific needs and goals. Additionally, they should prioritize regular physical activity and speak with their healthcare provider about any necessary medical interventions to manage their blood pressure, diabetes, and high cholesterol.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition represents a male with very activity level, who is obese with a BMI greater than or equal to 30, has normal blood pressure but has been diagnosed with diabetes and is a vegetarian who can consume lactose. However, they do not have high cholesterol levels.

As an expert dietitian, I would recommend a well-balanced and nutrient-dense diet that is tailored to manage diabetes and support weight loss. This individual should aim to include a variety of colorful vegetables, fruits, whole grains, lean protein sources, and healthy fats in their meals. As a vegetarian, they should ensure they are getting enough protein from plant-based sources like legumes, tofu, tempeh, and nuts, and supplement their diet with vitamin B12 and iron. Additionally, it's important to monitor portion sizes and limit added sugars, refined carbohydrates, and saturated and trans fats. Regular physical activity, adequate hydration, and stress management techniques can also be helpful for managing diabetes and maintaining a healthy weight.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the given conditions, the individual is a veryly active, obese male who has diabetes, normal blood pressure, and does not consume animal products or lactose. It is important for this individual to focus on a diet that is low in added sugars and refined carbohydrates to help manage blood sugar levels. They should consume a variety of plant-based foods, including whole grains, fruits, vegetables, and legumes to provide essential nutrients and fiber. Additionally, they may benefit from incorporating healthy fats, such as nuts, seeds, and avocados into their diet to help promote satiety and manage cholesterol levels. It is important for this individual to work with a registered dietitian to create a personalized nutrition plan that meets their individual needs and preferences.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This individual has diabetes and lactose intolerance, but no high blood pressure or high cholesterol. It's important for them to monitor their blood sugar levels closely and maintain a balanced diet with appropriate carbohydrate and protein intake. Lactose-free dairy products and alternative sources of calcium should be incorporated to ensure adequate nutrient intake. Vegetables, whole grains, lean protein, and healthy fats should be prioritized, while limiting added sugars and processed foods. Regular physical activity, along with a balanced diet, is also important for managing diabetes and maintaining overall health.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `I would recommend this individual to focus on a balanced and heart-healthy diet to manage their high cholesterol levels. This could include reducing saturated and trans fats, increasing fiber-rich whole grains, fruits, vegetables, and lean protein sources such as fish and poultry, and limiting processed and high-sugar foods. Additionally, regular physical activity can help manage weight and improve cholesterol levels. It is also important for this individual to regularly monitor their cholesterol levels and work with a healthcare provider to determine the best approach for managing their cholesterol.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `If you are a male with a very activity level and a BMI over 30 who does not have high blood pressure, is not diabetic, is not lactose intolerant, and follows a vegetarian diet but has high cholesterol, it's important to make some dietary changes. You should aim to consume a diet low in saturated and trans fats and high in fiber, such as fruits, vegetables, whole grains, legumes, and lean protein sources like fish or skinless chicken. It's also important to limit your intake of processed foods, sugary drinks, and alcohol, which can contribute to high cholesterol levels. Consulting a registered dietitian can help you create a personalized diet plan that fits your nutritional needs and health goals.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `Based on the information provided, if a male has a very activity level, a BMI of 30 or more, does not have high blood pressure or diabetes, but has high cholesterol and is lactose intolerant, the dietitian's advice would be to limit saturated and trans fats in the diet, and to focus on consuming more whole, plant-based foods. Good choices include fruits, vegetables, whole grains, legumes, nuts, and seeds. Low-fat dairy alternatives, such as almond or soy milk, can be included in the diet to provide calcium and other important nutrients. It may also be helpful to work with a registered dietitian to develop a personalized nutrition plan.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given information, it seems like the person is a male with a very active lifestyle and an obese body mass index. They do not have high blood pressure or diabetes, and their cholesterol level is low. They are non-vegetarian but may have lactose intolerance.

My advice would be to focus on a balanced diet that is rich in nutrients while being mindful of their lactose intolerance. They should aim to consume a variety of fruits, vegetables, whole grains, and lean protein sources like poultry, fish, and legumes. It is also important for them to limit their intake of saturated and trans fats, added sugars, and processed foods. They may benefit from working with a registered dietitian to develop a personalized nutrition plan to meet their specific needs and goals. Additionally, incorporating regular physical activity into their routine can also help improve their overall health and wellbeing.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `a veryly active male individual with a BMI greater than or equal to 30, who does not have high blood pressure, diabetes or high cholesterol, is vegetarian and lactose intolerant. Based on this, as a dietitian, I would recommend a diet that is high in plant-based proteins such as legumes, tofu, and tempeh to ensure adequate protein intake. Foods rich in calcium such as fortified plant milks, dark leafy greens, and calcium-set tofu should be included to support bone health. Lactose-free dairy alternatives such as soy milk, almond milk, or oat milk can be used to meet calcium and vitamin D needs. It is important to focus on whole grains, fruits, vegetables, and healthy fats such as nuts, seeds, and avocado to ensure balanced nutrition. A consultation with a registered dietitian can be helpful in developing an individualized meal plan to meet specific nutrient needs.`;
}
else if (gender === "Male" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given information, if the individual is a veryly active male with a BMI over 30 and has no history of blood pressure or diabetes, but has high cholesterol and is lactose intolerant, then it is recommended to consume a low-fat diet with no dairy products. It is essential to focus on plant-based protein sources, such as beans, lentils, and soy products, along with whole grains, fruits, and vegetables. Additionally, reducing the intake of saturated and trans fats, processed foods, and sugary drinks is crucial for maintaining a healthy weight and reducing the risk of heart disease. Consulting a registered dietitian to develop a personalized nutrition plan is highly recommended.`;
}
///END MALE OB VERY RULES///

///START FEMALE OV SEDENTARY RULES///
if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
  advice = "Based on the information provided, it appears that you are a Female who has a sedentary lifestyle, has a BMI that falls between 25 and 29.9, has high blood pressure, and consumes a diet that includes vegetables, cholestrol and lactose. In order to improve your health, it is recommended that you consider increasing your physical activity levels, incorporating more whole foods into your diet, reducing your intake of saturated fats, and limiting your intake of sodium. Additionally, you may want to consult with a healthcare provider to discuss potential medication or treatment options for your high blood pressure.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a sedentary Female with an overweight BMI, high blood pressure, diabetes, high cholesterol, and a vegetarian diet, it's important that you make changes to your lifestyle and eating habits to improve your health. Since you are lactose intolerant, it's especially important to find alternative sources of calcium and vitamin D to maintain good bone health. You should work with a registered dietitian and your doctor to develop a personalized plan that includes regular exercise, a balanced diet that meets your nutritional needs, and appropriate medication to manage your blood pressure and diabetes. You may also benefit from stress-management techniques and other lifestyle changes, such as getting enough sleep and reducing alcohol intake. Making these changes can help you reduce your risk of heart disease, stroke, and other serious health conditions.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = "A balanced diet with moderate portions is essential to manage your weight and prevent health issues related to high blood pressure, diabetes, and high cholesterol. Try to incorporate more whole foods, fruits, and vegetables, while limiting processed and sugary foods. Since you're not a vegetarian, you can also include lean meats, fish, and low-fat dairy products in your meals. However, since you are lactose intolerant, you may need to choose lactose-free or low-lactose options. Your healthcare provider can also suggest appropriate dietary supplements if needed. Additionally, regular physical activity is important to maintain good health, so try to incorporate more movement into your day, such as brisk walking or other forms of exercise. Remember, small changes in your daily routine can make a big difference in your health and wellbeing.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = "it is recommended that you increase your physical activity, choose foods that are lower in saturated and trans fats, and limit your intake of sugar and salt. You may benefit from increasing your intake of fiber and whole grains, as well as fruits and vegetables that are lower in carbohydrates. You should also limit your alcohol intake and quit smoking, if applicable. Your dietitian can work with you to create a plan that meets your specific needs and goals";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "You are a Female with a sedentary lifestyle and a BMI that classifies you as overweight. You also have high blood pressure and diabetes, but not high cholesterol. You follow a vegetarian diet and can tolerate lactose. In order to improve your health, it is recommended that you limit your daily intake of calories and consume a balanced diet that includes fruits, vegetables, whole grains, lean proteins, and low-fat dairy products. You should also incorporate physical activity into your daily routine and aim for at least 30 minutes of moderate-intensity exercise most days of the week. It's important to monitor your blood pressure and blood sugar regularly and follow any medication and treatment plans prescribed by your doctor. If you have any questions or concerns, it's recommended that you consult with a healthcare professional for personalized advice";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "You are a Female with a sedentary lifestyle and have a BMI in the overweight range. You have high blood pressure and diabetes, but don't have high cholesterol. You follow a vegetarian diet and don't consume dairy products. It is important for you to maintain a healthy diet and lifestyle to manage your conditions. Try to incorporate a variety of nutrient-dense plant-based foods to meet your nutritional needs. Consider consulting with a registered dietitian to help you develop a personalized nutrition plan that meets your specific needs.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "As a Female with a sedentary lifestyle and being overweight, managing your blood pressure and diabetes is essential. Avoid consuming high cholesterol and lactose products. Increase your physical activity level and choose a balanced and healthy diet. You may want to consult a healthcare professional for a personalized plan to manage your health.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "Given your current health condition, it is important to make significant lifestyle changes to improve your health. You should consult a registered dietitian to develop a personalized meal plan that takes your nutritional needs into account, while also promoting weight loss. In addition, it is highly recommended that you engage in moderate exercise for at least 30 minutes per day to help lower your blood pressure, manage diabetes, and reduce the risk of cardiovascular disease. Furthermore, it may be helpful to manage your stress levels and get enough sleep to further support your overall health. While making these lifestyle changes may be challenging, they will be well worth it in the long run for a healthier and happier life.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "Based on your information, it's important to manage your weight and blood pressure. Since you're overweight, you might want to consider ways to lose weight, such as exercising regularly and making dietary changes. Additionally, since you have high blood pressure, it's crucial to monitor it regularly and take any medication your doctor prescribes. As a diabetic, you should also keep your blood sugar under control and work with your doctor to manage your condition. Given your high cholesterol, you may want to limit your intake of saturated and trans fats and increase your consumption of high-fiber foods, fruits, and vegetables. As a vegetarian, you might want to consider incorporating plant-based protein sources into your diet to help maintain healthy blood sugar and cholesterol levels. Finally, if you're lactose intolerant, there are several alternatives to dairy that you can try, such as soy or almond milk. Overall, it's important to work with your healthcare provider to develop a comprehensive plan for managing your various health conditions";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a sedentary Female with a BMI in the overweight range, it is important to monitor your blood pressure as it appears to be high. While you do not have diabetes, you should be aware of the potential risk of developing it, especially since you are not a vegetarian and have no lactose intolerance. Additionally, you have indicated that you have high cholesterol levels, which could also contribute to an increased risk of developing cardiovascular disease. It is recommended that you follow a heart-healthy diet, which includes limiting your intake of saturated and trans fats, and increasing your consumption of fruits, vegetables, whole grains, lean proteins, and healthy fats. It is also important to engage in regular physical activity, such as walking, biking, or swimming, for at least 30 minutes a day, most days of the week, to help improve your overall health and reduce your risk of chronic diseases.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `Since you have high blood pressure and high cholesterol, it is important to make some changes in your diet and lifestyle. Here are some recommendations:
  Follow a low-sodium diet to help lower your blood pressure. This means limiting your intake of salty foods like processed snacks, canned foods, and fast food.
  Increase your intake of fruits and vegetables, whole grains, and lean protein sources such as chicken, fish, and legumes. These foods are high in fiber and other nutrients that can help lower cholesterol.
  Limit your intake of saturated and trans fats, which can raise your cholesterol levels. This means avoiding fried foods, processed snacks, and fatty meats.
  Increase your physical activity level by incorporating more exercise into your daily routine. Aim for at least 30 minutes of moderate-intensity activity, such as brisk walking, on most days of the week.
  Consider talking to your doctor about medication options to help manage your blood pressure and cholesterol levels.
  If you are lactose intolerant, consider alternative sources of calcium, such as fortified plant milks or supplements.
  Remember, making small changes to your diet and lifestyle can have a big impact on your health. Be sure to talk to your doctor about any changes you plan to make, and work with a registered dietitian to develop a personalized eating plan.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `Based on the given information, if the person is a sedentary Female with a BMI in the overweight range (25 to 29.9) and has high blood pressure but does not have diabetes, and has high cholesterol and is not a vegetarian and is not lactose intolerant, they may benefit from the following advice:
  Increase physical activity: Incorporate regular exercise, such as brisk walking or light jogging, into daily routine.
  Modify diet: Reduce saturated and trans fats intake and increase consumption of fruits, vegetables, whole grains, and lean protein sources.
  Reduce sodium intake: Limit the amount of salt in the diet to help lower blood pressure.
  Take medications as prescribed: If the person has been prescribed medication for high blood pressure and high cholesterol, it is important to take them as directed by their doctor.
  Regular monitoring: Regularly monitor blood pressure and cholesterol levels as directed by a doctor to ensure that they are under control.
  It is also recommended that the person consult with their doctor or a registered dietitian for a personalized plan to improve their overall health.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = `If the individual is Female, sedentary, has a BMI between 25 and 29.9, has high blood pressure, does not have diabetes or high cholesterol, and is a vegetarian who can consume dairy, I would advise them to:
  Focus on consuming a variety of fruits, vegetables, whole grains, lean proteins, and low-fat dairy products in appropriate portions.
  Incorporate physical activity into their daily routine to promote heart health, such as walking or other forms of aerobic exercise.
  Limit processed and high-fat foods, as well as excess sodium and added sugars.
  Monitor blood pressure regularly and take prescribed medications as directed by their healthcare provider.
  Consider speaking with a registered dietitian for personalized nutrition recommendations and support.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary Female with a BMI between 25 and 29.9, with high blood pressure, no diabetes, no high cholesterol, and who does not consume meat but consumes dairy products, I would recommend the following:
  Increase physical activity level gradually with a combination of strength training and aerobic exercise.
  Incorporate whole grains, legumes, fruits, vegetables, and nuts into daily meals.
  Reduce intake of high-calorie and high-fat foods.
  Limit consumption of processed and sugary foods.
  Monitor blood pressure and take medication as prescribed by a doctor.
  Consider consulting with a registered dietitian to ensure nutritional needs are met.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "Since you are a sedentary Female with a BMI between 25 and 29.9, have high blood pressure, do not have diabetes, and have high cholesterol, it's important to make some lifestyle changes to improve your health. You should aim to reduce your intake of saturated and trans fats, which can contribute to high cholesterol, and increase your intake of whole grains, fruits, and vegetables, which can help lower your blood pressure and improve your overall health. Consider cutting back on processed and fried foods, and instead opt for lean proteins like fish, chicken, and legumes. If you're not already doing so, try to engage in regular physical activity, like taking daily walks or doing low-impact exercises. Finally, talk to your doctor about medication options for high blood pressure and high cholesterol, which can help reduce your risk of heart disease and other complications.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "If you are a sedentary Female with a BMI between 25 and 29.9, and you have high blood pressure, no diabetes, no high cholesterol, and do not consume vegetables or dairy, I recommend you consider making some lifestyle changes to improve your health. First, try to increase your physical activity levels to help lower your blood pressure and improve overall health. Aim to engage in at least 30 minutes of moderate exercise most days of the week. Second, consider incorporating more vegetables and fruits into your diet. These foods are low in calories and high in nutrients, and can help you maintain a healthy weight and reduce your risk of chronic diseases. Third, limit your intake of processed and high-fat foods, as well as foods high in added sugars and salt, as these can increase your risk of high blood pressure and other health problems. Lastly, it may be helpful to consult with a healthcare professional or registered dietitian to develop a personalized plan to improve your health and manage any existing health conditions.";
}else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = `Based on the information provided, here is some long advice for a Female who is sedentary with a BMI between 25 and 29.9, has diabetes and high cholesterol, does not have high blood pressure, and consumes a vegetarian or lacto-vegetarian diet:
  Follow a healthy eating plan that is rich in vegetables, fruits, whole grains, lean protein sources, and healthy fats.
  Limit your intake of saturated and trans fats, cholesterol, sodium, and added sugars.
  Choose lean protein sources, such as fish, skinless poultry, and legumes, instead of red and processed meats.
  Include heart-healthy fats in your diet, such as those found in nuts, seeds, avocado, and fatty fish.
  Monitor your blood sugar levels and take medications as prescribed by your healthcare provider.
  Manage your cholesterol levels by taking medications as prescribed, if necessary, and making dietary changes.
  If you smoke, quit smoking to lower your risk of heart disease and other health problems.
  Aim to engage in regular physical activity, such as walking, cycling, or swimming, for at least 30 minutes per day, most days of the week, or as advised by your healthcare provider.
  Work with your healthcare provider to develop a personalized plan to manage your health, and attend regular check-ups to monitor your progress.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `If a sedentary Female has a BMI between 25 and 29.9, no blood pressure issues, diabetes, or high cholesterol, is vegetarian but does not consume dairy products, the following long advice can be given:
  Since you are a vegetarian, it is important to make sure you get enough protein from other sources such as beans, legumes, and nuts.
  Increase your physical activity level to improve your overall health and decrease your risk of chronic diseases such as heart disease and diabetes. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, as well as muscle-strengthening activities at least two days per week.
  Consider consulting with a registered dietitian to ensure that you are meeting your nutrient needs and to develop a meal plan that works for you.
  Avoid processed and high-fat vegetarian options, as they can contribute to weight gain and increase your risk for heart disease and other chronic conditions.
  Limit your intake of added sugars, refined grains, and saturated fats, as these can contribute to weight gain and increase your risk for chronic diseases.
  If you are not already doing so, try to manage stress through techniques such as meditation, yoga, or other relaxation techniques. High levels of stress can contribute to weight gain and increase your risk for chronic diseases.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `For a sedentary Female with a BMI between 25 and 29.9 who has no high blood pressure, has diabetes, high cholesterol and doesn't consume vegetables but consumes dairy products, the following advice can be helpful:
  Follow a low-glycemic index diet to manage diabetes better.
  Focus on consuming plant-based whole foods like vegetables, fruits, whole grains, and legumes to lower cholesterol levels and manage diabetes and blood pressure better.
  Limit intake of saturated and trans fats and avoid processed foods to manage high cholesterol levels.
  Engage in physical activity regularly, such as walking, jogging, cycling or swimming, to improve overall health and manage diabetes, cholesterol, and blood pressure levels.
  Consult a doctor and a registered dietitian for a personalized dietary and exercise plan.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `For a Female with a sedentary lifestyle, BMI between 25 and 29.9, no high blood pressure, and a history of diabetes and high cholesterol, but not following a vegetarian or lactose-free diet, I would recommend:
  Follow a balanced and healthy diet rich in whole grains, fruits, vegetables, and lean protein sources such as fish and poultry.
  Limit saturated and trans fats, cholesterol, and sodium intake.
  Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 30 minutes a day, most days of the week.
  Control blood sugar levels through medication or lifestyle changes, such as losing weight and consuming fewer carbohydrates.
  Control cholesterol levels through medication or lifestyle changes, such as losing weight, increasing fiber intake, and limiting dietary cholesterol and saturated fat.
  Schedule regular follow-up appointments with a healthcare provider to monitor your health status and adjust your treatment plan as needed.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "Since you are Female, have a sedentary lifestyle and have a BMI between 25 and 29.9, you should focus on improving your diet and increasing your physical activity to reduce your risk of developing health problems. As you have normal blood pressure, diabetes and cholesterol, incorporating regular exercise and following a balanced diet with a mix of vegetables, fruits, whole grains, lean protein and low-fat dairy products could be beneficial. Limit your intake of processed foods, sugary drinks and high-fat foods to keep your overall calorie intake in check. Additionally, you can consider consulting a registered dietitian for a personalized meal plan and a healthcare professional for a tailored exercise program.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary Female with BMI between 25 and 29.9, without blood pressure issues, with diabetes, no cholesterol issues, not consuming vegetables and not consuming lactose, my advice would be:
  Consume foods rich in fiber, such as whole grains, beans, fruits, and vegetables.
  Choose lean protein sources, such as skinless chicken, fish, and plant-based protein sources.
  Avoid sugary drinks and limit high-fat and high-calorie foods.
  Check your blood sugar levels regularly and take medications as prescribed by your healthcare provider.
  Incorporate physical activity into your daily routine, such as walking, biking, or swimming. Aim for at least 150 minutes of moderate-intensity aerobic exercise per week.
  Consult with a registered dietitian for a personalized nutrition plan that fits your lifestyle and preferences.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = `For a sedentary Female with BMI between 25 and 29.9, without high blood pressure or cholesterol, and who doesn't have diabetes but does consume dairy, the following advice can be given:
  Increase physical activity level to at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week
  Follow a balanced diet that is rich in vegetables, fruits, whole grains, lean protein sources, and low-fat dairy products
  Limit intake of processed and high-fat foods, sugary drinks, and alcohol
  Monitor blood pressure and cholesterol levels regularly
  Consider regular diabetes screening
  Maintain a healthy weight by continuing to monitor and manage BMI
  Incorporate stress management techniques such as meditation or deep breathing exercises
  Consult with a healthcare professional for personalized advice and support.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "If you are a sedentary Female with a BMI between 25 and 29.9, without high blood pressure or diabetes, and with high cholesterol, it is recommended that you consume a balanced diet with plenty of fruits, vegetables, whole grains, and lean protein sources. It is also advised to limit your intake of saturated and trans fats, added sugars, and salt. Incorporating regular physical activity into your daily routine can also help improve your health";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `For a sedentary Female with a BMI between 25 and 29.9, without blood pressure or diabetes issues, and high cholesterol, who is not a vegetarian and does not consume dairy, it is recommended to:
  Reduce the intake of saturated fats and increase the intake of fruits, vegetables, and whole grains.
  Choose lean protein sources such as fish, poultry, legumes, and nuts.
  Engage in regular physical activity, such as brisk walking or cycling, for at least 30 minutes a day.
  Consider consulting a healthcare professional for additional support and guidance.`;
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = " it is important to follow a balanced diet and engage in regular physical activity to maintain a healthy weight and reduce the risk of chronic conditions. If you have any specific health concerns, it is best to consult with a healthcare professional for personalized advice.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "For a sedentary Female with a BMI between 25 and 29.9, without high blood pressure, diabetes or high cholesterol, who does not consume meat and consumes dairy, my advice would be to focus on a balanced diet that includes whole grains, fruits and vegetables, legumes, nuts and seeds, and low-fat dairy products to help maintain a healthy weight and reduce the risk of chronic diseases. It is also important to engage in regular physical activity and to get enough sleep each night.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "If a sedentary Female with a BMI between 25 and 29.9 has no high blood pressure, no diabetes, no high cholesterol, is not consuming any dairy, and is following a vegetarian diet, it is recommended to focus on incorporating more physical activity into daily routine, and considering incorporating more sources of plant-based protein, fiber, and healthy fats to promote overall health and well-being. Additionally, a healthcare provider should be consulted for personalized advice and monitoring of health markers.";
}
else if (gender === "Female" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "would be to focus on increasing physical activity levels to achieve a healthier weight and to reduce the risk of developing high blood pressure, diabetes, and high cholesterol. Incorporating cardiovascular exercise, strength training, and flexibility exercises, as well as making dietary changes, such as reducing intake of processed foods and increasing intake of whole foods, may be beneficial. It is also important to monitor blood pressure, blood sugar, and cholesterol levels regularly and consult with a healthcare professional for further guidance.";
}
///END FEMALE OV SEDENTARY RULES///

///START FEMALE OV LIGHTLY RULES///
if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
  advice = "Based on the information provided, it appears that you are a Female who has a lightly lifestyle, has a BMI that falls between 25 and 29.9, has high blood pressure, and consumes a diet that includes vegetables, cholestrol and lactose. In order to improve your health, it is recommended that you consider increasing your physical activity levels, incorporating more whole foods into your diet, reducing your intake of saturated fats, and limiting your intake of sodium. Additionally, you may want to consult with a healthcare provider to discuss potential medication or treatment options for your high blood pressure.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a lightly Female with an overweight BMI, high blood pressure, diabetes, high cholesterol, and a vegetarian diet, it's important that you make changes to your lifestyle and eating habits to improve your health. Since you are lactose intolerant, it's especially important to find alternative sources of calcium and vitamin D to maintain good bone health. You should work with a registered dietitian and your doctor to develop a personalized plan that includes regular exercise, a balanced diet that meets your nutritional needs, and appropriate medication to manage your blood pressure and diabetes. You may also benefit from stress-management techniques and other lifestyle changes, such as getting enough sleep and reducing alcohol intake. Making these changes can help you reduce your risk of heart disease, stroke, and other serious health conditions.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = "A balanced diet with moderate portions is essential to manage your weight and prevent health issues related to high blood pressure, diabetes, and high cholesterol. Try to incorporate more whole foods, fruits, and vegetables, while limiting processed and sugary foods. Since you're not a vegetarian, you can also include lean meats, fish, and low-fat dairy products in your meals. However, since you are lactose intolerant, you may need to choose lactose-free or low-lactose options. Your healthcare provider can also suggest appropriate dietary supplements if needed. Additionally, regular physical activity is important to maintain good health, so try to incorporate more movement into your day, such as brisk walking or other forms of exercise. Remember, small changes in your daily routine can make a big difference in your health and wellbeing.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = "it is recommended that you increase your physical activity, choose foods that are lower in saturated and trans fats, and limit your intake of sugar and salt. You may benefit from increasing your intake of fiber and whole grains, as well as fruits and vegetables that are lower in carbohydrates. You should also limit your alcohol intake and quit smoking, if applicable. Your dietitian can work with you to create a plan that meets your specific needs and goals";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "You are a Female with a lightly lifestyle and a BMI that classifies you as overweight. You also have high blood pressure and diabetes, but not high cholesterol. You follow a vegetarian diet and can tolerate lactose. In order to improve your health, it is recommended that you limit your daily intake of calories and consume a balanced diet that includes fruits, vegetables, whole grains, lean proteins, and low-fat dairy products. You should also incorporate physical activity into your daily routine and aim for at least 30 minutes of moderate-intensity exercise most days of the week. It's important to monitor your blood pressure and blood sugar regularly and follow any medication and treatment plans prescribed by your doctor. If you have any questions or concerns, it's recommended that you consult with a healthcare professional for personalized advice";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "You are a Female with a lightly lifestyle and have a BMI in the overweight range. You have high blood pressure and diabetes, but don't have high cholesterol. You follow a vegetarian diet and don't consume dairy products. It is important for you to maintain a healthy diet and lifestyle to manage your conditions. Try to incorporate a variety of nutrient-dense plant-based foods to meet your nutritional needs. Consider consulting with a registered dietitian to help you develop a personalized nutrition plan that meets your specific needs.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "As a Female with a lightly lifestyle and being overweight, managing your blood pressure and diabetes is essential. Avoid consuming high cholesterol and lactose products. Increase your physical activity level and choose a balanced and healthy diet. You may want to consult a healthcare professional for a personalized plan to manage your health.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "Given your current health condition, it is important to make significant lifestyle changes to improve your health. You should consult a registered dietitian to develop a personalized meal plan that takes your nutritional needs into account, while also promoting weight loss. In addition, it is highly recommended that you engage in moderate exercise for at least 30 minutes per day to help lower your blood pressure, manage diabetes, and reduce the risk of cardiovascular disease. Furthermore, it may be helpful to manage your stress levels and get enough sleep to further support your overall health. While making these lifestyle changes may be challenging, they will be well worth it in the long run for a healthier and happier life.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "Based on your information, it's important to manage your weight and blood pressure. Since you're overweight, you might want to consider ways to lose weight, such as exercising regularly and making dietary changes. Additionally, since you have high blood pressure, it's crucial to monitor it regularly and take any medication your doctor prescribes. As a diabetic, you should also keep your blood sugar under control and work with your doctor to manage your condition. Given your high cholesterol, you may want to limit your intake of saturated and trans fats and increase your consumption of high-fiber foods, fruits, and vegetables. As a vegetarian, you might want to consider incorporating plant-based protein sources into your diet to help maintain healthy blood sugar and cholesterol levels. Finally, if you're lactose intolerant, there are several alternatives to dairy that you can try, such as soy or almond milk. Overall, it's important to work with your healthcare provider to develop a comprehensive plan for managing your various health conditions";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = "As a lightly Female with a BMI in the overweight range, it is important to monitor your blood pressure as it appears to be high. While you do not have diabetes, you should be aware of the potential risk of developing it, especially since you are not a vegetarian and have no lactose intolerance. Additionally, you have indicated that you have high cholesterol levels, which could also contribute to an increased risk of developing cardiovascular disease. It is recommended that you follow a heart-healthy diet, which includes limiting your intake of saturated and trans fats, and increasing your consumption of fruits, vegetables, whole grains, lean proteins, and healthy fats. It is also important to engage in regular physical activity, such as walking, biking, or swimming, for at least 30 minutes a day, most days of the week, to help improve your overall health and reduce your risk of chronic diseases.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `Since you have high blood pressure and high cholesterol, it is important to make some changes in your diet and lifestyle. Here are some recommendations:
  Follow a low-sodium diet to help lower your blood pressure. This means limiting your intake of salty foods like processed snacks, canned foods, and fast food.
  Increase your intake of fruits and vegetables, whole grains, and lean protein sources such as chicken, fish, and legumes. These foods are high in fiber and other nutrients that can help lower cholesterol.
  Limit your intake of saturated and trans fats, which can raise your cholesterol levels. This means avoiding fried foods, processed snacks, and fatty meats.
  Increase your physical activity level by incorporating more exercise into your daily routine. Aim for at least 30 minutes of moderate-intensity activity, such as brisk walking, on most days of the week.
  Consider talking to your doctor about medication options to help manage your blood pressure and cholesterol levels.
  If you are lactose intolerant, consider alternative sources of calcium, such as fortified plant milks or supplements.
  Remember, making small changes to your diet and lifestyle can have a big impact on your health. Be sure to talk to your doctor about any changes you plan to make, and work with a registered dietitian to develop a personalized eating plan.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `Based on the given information, if the person is a lightly Female with a BMI in the overweight range (25 to 29.9) and has high blood pressure but does not have diabetes, and has high cholesterol and is not a vegetarian and is not lactose intolerant, they may benefit from the following advice:
  Increase physical activity: Incorporate regular exercise, such as brisk walking or light jogging, into daily routine.
  Modify diet: Reduce saturated and trans fats intake and increase consumption of fruits, vegetables, whole grains, and lean protein sources.
  Reduce sodium intake: Limit the amount of salt in the diet to help lower blood pressure.
  Take medications as prescribed: If the person has been prescribed medication for high blood pressure and high cholesterol, it is important to take them as directed by their doctor.
  Regular monitoring: Regularly monitor blood pressure and cholesterol levels as directed by a doctor to ensure that they are under control.
  It is also recommended that the person consult with their doctor or a registered dietitian for a personalized plan to improve their overall health.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = `If the individual is Female, lightly, has a BMI between 25 and 29.9, has high blood pressure, does not have diabetes or high cholesterol, and is a vegetarian who can consume dairy, I would advise them to:
  Focus on consuming a variety of fruits, vegetables, whole grains, lean proteins, and low-fat dairy products in appropriate portions.
  Incorporate physical activity into their daily routine to promote heart health, such as walking or other forms of aerobic exercise.
  Limit processed and high-fat foods, as well as excess sodium and added sugars.
  Monitor blood pressure regularly and take prescribed medications as directed by their healthcare provider.
  Consider speaking with a registered dietitian for personalized nutrition recommendations and support.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a lightly Female with a BMI between 25 and 29.9, with high blood pressure, no diabetes, no high cholesterol, and who does not consume meat but consumes dairy products, I would recommend the following:
  Increase physical activity level gradually with a combination of strength training and aerobic exercise.
  Incorporate whole grains, legumes, fruits, vegetables, and nuts into daily meals.
  Reduce intake of high-calorie and high-fat foods.
  Limit consumption of processed and sugary foods.
  Monitor blood pressure and take medication as prescribed by a doctor.
  Consider consulting with a registered dietitian to ensure nutritional needs are met.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "Since you are a lightly Female with a BMI between 25 and 29.9, have high blood pressure, do not have diabetes, and have high cholesterol, it's important to make some lifestyle changes to improve your health. You should aim to reduce your intake of saturated and trans fats, which can contribute to high cholesterol, and increase your intake of whole grains, fruits, and vegetables, which can help lower your blood pressure and improve your overall health. Consider cutting back on processed and fried foods, and instead opt for lean proteins like fish, chicken, and legumes. If you're not already doing so, try to engage in regular physical activity, like taking daily walks or doing low-impact exercises. Finally, talk to your doctor about medication options for high blood pressure and high cholesterol, which can help reduce your risk of heart disease and other complications.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
  advice = "If you are a lightly Female with a BMI between 25 and 29.9, and you have high blood pressure, no diabetes, no high cholesterol, and do not consume vegetables or dairy, I recommend you consider making some lifestyle changes to improve your health. First, try to increase your physical activity levels to help lower your blood pressure and improve overall health. Aim to engage in at least 30 minutes of moderate exercise most days of the week. Second, consider incorporating more vegetables and fruits into your diet. These foods are low in calories and high in nutrients, and can help you maintain a healthy weight and reduce your risk of chronic diseases. Third, limit your intake of processed and high-fat foods, as well as foods high in added sugars and salt, as these can increase your risk of high blood pressure and other health problems. Lastly, it may be helpful to consult with a healthcare professional or registered dietitian to develop a personalized plan to improve your health and manage any existing health conditions.";
}else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = `Based on the information provided, here is some long advice for a Female who is lightly with a BMI between 25 and 29.9, has diabetes and high cholesterol, does not have high blood pressure, and consumes a vegetarian or lacto-vegetarian diet:
  Follow a healthy eating plan that is rich in vegetables, fruits, whole grains, lean protein sources, and healthy fats.
  Limit your intake of saturated and trans fats, cholesterol, sodium, and added sugars.
  Choose lean protein sources, such as fish, skinless poultry, and legumes, instead of red and processed meats.
  Include heart-healthy fats in your diet, such as those found in nuts, seeds, avocado, and fatty fish.
  Monitor your blood sugar levels and take medications as prescribed by your healthcare provider.
  Manage your cholesterol levels by taking medications as prescribed, if necessary, and making dietary changes.
  If you smoke, quit smoking to lower your risk of heart disease and other health problems.
  Aim to engage in regular physical activity, such as walking, cycling, or swimming, for at least 30 minutes per day, most days of the week, or as advised by your healthcare provider.
  Work with your healthcare provider to develop a personalized plan to manage your health, and attend regular check-ups to monitor your progress.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `If a lightly Female has a BMI between 25 and 29.9, no blood pressure issues, diabetes, or high cholesterol, is vegetarian but does not consume dairy products, the following long advice can be given:
  Since you are a vegetarian, it is important to make sure you get enough protein from other sources such as beans, legumes, and nuts.
  Increase your physical activity level to improve your overall health and decrease your risk of chronic diseases such as heart disease and diabetes. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, as well as muscle-strengthening activities at least two days per week.
  Consider consulting with a registered dietitian to ensure that you are meeting your nutrient needs and to develop a meal plan that works for you.
  Avoid processed and high-fat vegetarian options, as they can contribute to weight gain and increase your risk for heart disease and other chronic conditions.
  Limit your intake of added sugars, refined grains, and saturated fats, as these can contribute to weight gain and increase your risk for chronic diseases.
  If you are not already doing so, try to manage stress through techniques such as meditation, yoga, or other relaxation techniques. High levels of stress can contribute to weight gain and increase your risk for chronic diseases.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = `For a lightly Female with a BMI between 25 and 29.9 who has no high blood pressure, has diabetes, high cholesterol and doesn't consume vegetables but consumes dairy products, the following advice can be helpful:
  Follow a low-glycemic index diet to manage diabetes better.
  Focus on consuming plant-based whole foods like vegetables, fruits, whole grains, and legumes to lower cholesterol levels and manage diabetes and blood pressure better.
  Limit intake of saturated and trans fats and avoid processed foods to manage high cholesterol levels.
  Engage in physical activity regularly, such as walking, jogging, cycling or swimming, to improve overall health and manage diabetes, cholesterol, and blood pressure levels.
  Consult a doctor and a registered dietitian for a personalized dietary and exercise plan.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
  advice = `For a Female with a lightly lifestyle, BMI between 25 and 29.9, no high blood pressure, and a history of diabetes and high cholesterol, but not following a vegetarian or lactose-free diet, I would recommend:
  Follow a balanced and healthy diet rich in whole grains, fruits, vegetables, and lean protein sources such as fish and poultry.
  Limit saturated and trans fats, cholesterol, and sodium intake.
  Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 30 minutes a day, most days of the week.
  Control blood sugar levels through medication or lifestyle changes, such as losing weight and consuming fewer carbohydrates.
  Control cholesterol levels through medication or lifestyle changes, such as losing weight, increasing fiber intake, and limiting dietary cholesterol and saturated fat.
  Schedule regular follow-up appointments with a healthcare provider to monitor your health status and adjust your treatment plan as needed.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "Since you are Female, have a lightly lifestyle and have a BMI between 25 and 29.9, you should focus on improving your diet and increasing your physical activity to reduce your risk of developing health problems. As you have normal blood pressure, diabetes and cholesterol, incorporating regular exercise and following a balanced diet with a mix of vegetables, fruits, whole grains, lean protein and low-fat dairy products could be beneficial. Limit your intake of processed foods, sugary drinks and high-fat foods to keep your overall calorie intake in check. Additionally, you can consider consulting a registered dietitian for a personalized meal plan and a healthcare professional for a tailored exercise program.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = `For a lightly Female with BMI between 25 and 29.9, without blood pressure issues, with diabetes, no cholesterol issues, not consuming vegetables and not consuming lactose, my advice would be:
  Consume foods rich in fiber, such as whole grains, beans, fruits, and vegetables.
  Choose lean protein sources, such as skinless chicken, fish, and plant-based protein sources.
  Avoid sugary drinks and limit high-fat and high-calorie foods.
  Check your blood sugar levels regularly and take medications as prescribed by your healthcare provider.
  Incorporate physical activity into your daily routine, such as walking, biking, or swimming. Aim for at least 150 minutes of moderate-intensity aerobic exercise per week.
  Consult with a registered dietitian for a personalized nutrition plan that fits your lifestyle and preferences.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = `For a lightly Female with BMI between 25 and 29.9, without high blood pressure or cholesterol, and who doesn't have diabetes but does consume dairy, the following advice can be given:
  Increase physical activity level to at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week
  Follow a balanced diet that is rich in vegetables, fruits, whole grains, lean protein sources, and low-fat dairy products
  Limit intake of processed and high-fat foods, sugary drinks, and alcohol
  Monitor blood pressure and cholesterol levels regularly
  Consider regular diabetes screening
  Maintain a healthy weight by continuing to monitor and manage BMI
  Incorporate stress management techniques such as meditation or deep breathing exercises
  Consult with a healthcare professional for personalized advice and support.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
  advice = "If you are a lightly Female with a BMI between 25 and 29.9, without high blood pressure or diabetes, and with high cholesterol, it is recommended that you consume a balanced diet with plenty of fruits, vegetables, whole grains, and lean protein sources. It is also advised to limit your intake of saturated and trans fats, added sugars, and salt. Incorporating regular physical activity into your daily routine can also help improve your health";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
  advice = `For a lightly Female with a BMI between 25 and 29.9, without blood pressure or diabetes issues, and high cholesterol, who is not a vegetarian and does not consume dairy, it is recommended to:
  Reduce the intake of saturated fats and increase the intake of fruits, vegetables, and whole grains.
  Choose lean protein sources such as fish, poultry, legumes, and nuts.
  Engage in regular physical activity, such as brisk walking or cycling, for at least 30 minutes a day.
  Consider consulting a healthcare professional for additional support and guidance.`;
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
  advice = " it is important to follow a balanced diet and engage in regular physical activity to maintain a healthy weight and reduce the risk of chronic conditions. If you have any specific health concerns, it is best to consult with a healthcare professional for personalized advice.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
  advice = "For a lightly Female with a BMI between 25 and 29.9, without high blood pressure, diabetes or high cholesterol, who does not consume meat and consumes dairy, my advice would be to focus on a balanced diet that includes whole grains, fruits and vegetables, legumes, nuts and seeds, and low-fat dairy products to help maintain a healthy weight and reduce the risk of chronic diseases. It is also important to engage in regular physical activity and to get enough sleep each night.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
  advice = "If a lightly Female with a BMI between 25 and 29.9 has no high blood pressure, no diabetes, no high cholesterol, is not consuming any dairy, and is following a vegetarian diet, it is recommended to focus on incorporating more physical activity into daily routine, and considering incorporating more sources of plant-based protein, fiber, and healthy fats to promote overall health and well-being. Additionally, a healthcare provider should be consulted for personalized advice and monitoring of health markers.";
}
else if (gender === "Female" && activity === "lightly" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
  advice = "would be to focus on increasing physical activity levels to achieve a healthier weight and to reduce the risk of developing high blood pressure, diabetes, and high cholesterol. Incorporating cardiovascular exercise, strength training, and flexibility exercises, as well as making dietary changes, such as reducing intake of processed foods and increasing intake of whole foods, may be beneficial. It is also important to monitor blood pressure, blood sugar, and cholesterol levels regularly and consult with a healthcare professional for further guidance.";
}
///END FEMALE OV LIGHLY RULESS///

///START FEMALE OV MODERATE RULES///
if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure, diabetes, high cholesterol, and lactose intolerance who follows a vegetarian diet, it is important to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to incorporate low-fat dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods, and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In the absence of high cholesterol, incorporating moderate amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In the absence of high cholesterol, incorporating moderate amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet but has lactose intolerance and does not have diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet and has both lactose intolerance and no diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. Incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with moderate activity and being overweight with high blood pressure, who follows a vegetarian diet and has lactose intolerance but no diabetes or high cholesterol, it is recommended to focus on consuming a variety of plant-based protein sources such as legumes, tofu, tempeh, and seitan, and ensuring adequate intake of essential nutrients such as vitamin B12, iron, and zinc, which may be low in vegetarian diets. Incorporating foods rich in potassium, such as bananas and sweet potatoes, can help to lower blood pressure. It is also recommended to explore lactose-free or plant-based alternatives to dairy products to meet calcium and vitamin D needs. Working with a registered dietitian can help to develop a balanced vegetarian meal plan while addressing any individual nutritional concerns.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the provided conditions, it seems that you are a Female with moderate activity level, overweight (with a BMI between 25 and 29.9), and have high blood pressure and diabetes. Depending on your individual health goals and needs, it may be beneficial to work with a registered dietitian to develop a personalized nutrition plan that is appropriate for your health condition. In general, a healthy diet for someone with high blood pressure and diabetes should include plenty of fresh fruits and vegetables, lean protein sources, and whole grains while limiting sodium, added sugars, and saturated fats. It is also important to monitor your carbohydrate intake and distribute them evenly throughout the day to help manage blood sugar levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `If a Female's activity level is moderate, their BMI is between 25 and 29.9, they have high blood pressure, and they do not have diabetes or high cholesterol, but they are lactose intolerant, it is important to ensure that they are still consuming enough calcium from other sources, such as leafy greens, fortified non-dairy milks, and calcium-fortified foods, to maintain bone health. It may also be helpful to work with a registered dietitian to ensure they are meeting all of their nutrient needs.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `my advice for a Female with moderate activity level, overweight (bmi >= 25 and bmi <= 29.9), with high blood pressure, no diabetes, no high cholesterol, and who is not vegetarian or lactose intolerant, is to focus on a balanced and nutritious diet that is low in sodium and saturated fats. They should consume whole grains, lean protein sources such as fish and skinless poultry, and a variety of fruits and vegetables. It is important for them to control portion sizes and limit their intake of processed and high-calorie foods. Additionally, regular physical activity should be incorporated into their routine to aid in weight loss and improve overall health.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a Female with moderate activity, a BMI between 25 and 29.9, and diabetes, high blood pressure, and high cholesterol, who is also vegetarian and lactose-tolerant, but doesn't have high blood pressure, is to focus on a balanced diet with plenty of whole, nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins. It's important to limit processed and high-fat foods, including high-fat dairy products and meat alternatives, and to include regular physical activity as part of a healthy lifestyle. Consult with a registered dietitian for personalized guidance and support.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This condition represents a Female with moderate activity level, overweight BMI, no blood pressure issues, but with diabetes and high cholesterol who follows a vegetarian diet and is lactose intolerant. Based on this information, my advice would be to focus on a plant-based, low-glycemic index diet that emphasizes whole, unprocessed foods such as vegetables, fruits, legumes, nuts, and seeds. Foods with a high glycemic index, such as refined carbohydrates and sugars, should be avoided or limited as they can cause a rapid rise in blood sugar levels. It may also be helpful to work with a registered dietitian to develop a personalized meal plan that meets individual needs and preferences while addressing specific health concerns. Additionally, regular physical activity and stress management techniques can also be beneficial for managing diabetes and high cholesterol.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition indicates that a Female with a moderate level of physical activity who has a BMI between 25 and 29.9 and does not have high blood pressure but has diabetes and high cholesterol, and is either a lacto-vegetarian or has lactose intolerance. Based on this information, it is recommended to limit the intake of foods high in saturated fats and added sugars, such as processed and fried foods, and instead focus on a balanced diet that includes lean proteins, whole grains, fruits, vegetables, and healthy fats such as those found in nuts and seeds. Additionally, regular physical activity and weight management are also important in managing diabetes and cholesterol levels. Consulting with a registered dietitian can also provide personalized and comprehensive guidance.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `given the presence of diabetes and high cholesterol, it is generally recommended to limit or avoid foods high in saturated and trans fats, added sugars, and refined carbohydrates, and instead opt for a diet rich in fruits, vegetables, whole grains, lean protein sources, and healthy fats such as those found in nuts, seeds, and fatty fish. It may also be beneficial to work with a registered dietitian to develop a personalized meal plan to meet individual needs and goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = ` if you are a Female with moderate physical activity, and your BMI falls between 25 and 29.9, and you have diabetes but do not have high blood pressure or high cholesterol, and you are a vegetarian who can consume dairy, I would suggest that you consume a well-balanced diet that includes a variety of whole grains, legumes, fruits, vegetables, low-fat dairy products, and lean sources of protein. It's also important to limit your intake of processed and high-sugar foods and drinks, and to stay hydrated by drinking plenty of water. It's a good idea to work with a registered dietitian to help you develop a personalized nutrition plan to meet your specific needs and goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This code block represents a specific set of criteria for a Female individual who has a moderate level of physical activity, is overweight with a BMI between 25 and 29.9, has no blood pressure issues, has diabetes, has no high cholesterol, is vegetarian, and lactose intolerant. As a dietitian, I would recommend a diet that is low in saturated and trans fats, with a focus on whole grains, vegetables, fruits, lean protein sources such as legumes, fish and skinless poultry, and plant-based fats such as olive oil, nuts and seeds. For this individual, it would be particularly important to carefully plan meals to ensure they are getting enough essential nutrients, such as calcium and vitamin B12, which are typically found in dairy products. Alternative sources of these nutrients, such as fortified plant-based milks and supplements, should be considered. It would also be important to monitor blood sugar levels regularly and adjust the diet as needed to keep them under control. Regular physical activity and stress management techniques should also be incorporated into this individual's lifestyle to manage their diabetes effectively.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given conditions, the individual is a Female with moderate activity and has a BMI between 25 and 29.9, which indicates he is overweight. He also has no blood pressure issues, but has diabetes and does not consume meat or eggs. It is important for him to consume a well-balanced diet that meets his nutritional needs while also helping to manage his diabetes. He should focus on consuming whole grains, fruits, vegetables, nuts, and seeds to provide his body with essential nutrients and fiber. He may also benefit from incorporating plant-based sources of protein such as legumes and tofu into his diet. It is important for him to monitor his blood sugar levels and consult with a registered dietitian to help create a personalized meal plan. Additionally, regular exercise and weight management should be incorporated into his lifestyle to help manage his diabetes and overall health.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given conditions, you are a moderately active Female who is overweight but does not have high blood pressure, does not have diabetes, and is vegetarian and lactose intolerant. However, you have high cholesterol.

To help manage your cholesterol levels, it's recommended to limit your intake of saturated and trans fats, while increasing your intake of fiber-rich foods such as fruits, vegetables, and whole grains. You may also want to consider incorporating heart-healthy fats, such as those found in nuts, seeds, and fatty fish, into your diet. It's important to work with a registered dietitian to develop an individualized plan that meets your specific needs and goals. Additionally, regular physical activity and maintaining a healthy weight can also help improve cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with moderate activity and a BMI between 25 and 29.9, who does not have high blood pressure or diabetes but does have high cholesterol, a plant-based diet rich in fruits, vegetables, whole grains, and legumes may be recommended. In addition, reducing saturated and trans fats, and increasing intake of healthy fats such as omega-3 fatty acids found in fatty fish, nuts, and seeds may help improve cholesterol levels. Regular physical activity and weight management are also important components of managing high cholesterol.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with moderate activity and a BMI between 25 and 29.9 who does not have high blood pressure or diabetes but does have high cholesterol and is either vegetarian or lactose intolerant, I recommend following a balanced diet that is low in saturated and trans fats, high in fiber, and includes plenty of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may be helpful to incorporate cholesterol-lowering foods such as oats, nuts, and fatty fish, as well as plant-based sources of protein like legumes, tofu, and tempeh. Consider working with a registered dietitian to develop a personalized nutrition plan that meets your needs and preferences.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the provided information, as a dietitian, my advice for a Female with moderate activity and a BMI between 25 and 29.9, who doesn't have high blood pressure, diabetes or high cholesterol, and is vegetarian and lactose intolerant, is to incorporate a variety of plant-based protein sources in their diet such as beans, lentils, tofu, and nuts to meet their daily protein requirements. It's also important to consume a wide range of fruits and vegetables to get enough vitamins, minerals, and fiber. Choosing lactose-free dairy alternatives, such as soy or almond milk, can provide additional calcium and vitamin D. Lastly, reducing processed and high-fat foods, and cooking with healthy oils like olive or avocado oil can help maintain a healthy weight and reduce the risk of heart disease`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `If you're a moderately active overweight Female with no blood pressure issues, diabetes, or cholesterol concerns, but do not consume dairy products and follow a vegetarian diet, then it's important to ensure that you're getting enough protein, calcium, and vitamin D from plant-based sources. Consider incorporating foods such as beans, lentils, tofu, nuts, seeds, and fortified non-dairy milks into your diet to meet your nutritional needs. Additionally, be mindful of portion sizes and choose mostly whole, minimally processed foods. Regular physical activity can also help support your health and weight management goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This condition refers to a moderately active overweight Female with no high blood pressure, no diabetes, no high cholesterol, who is not a vegetarian but lactose intolerant. Based on this information, my advice would be to focus on non-dairy sources of protein and calcium, such as nuts, seeds, legumes, and leafy greens. It may also be helpful to try lactose-free dairy products or consider taking a lactase enzyme supplement to aid in digestion. Additionally, maintaining a balanced and varied diet with appropriate portion sizes can aid in weight management. It is also important to engage in regular physical activity and prioritize adequate sleep and stress management. A registered dietitian can provide more personalized recommendations and support.`;
}
///END FEMALE OV MODERATE RULES///

///START FEMALE OV VERY RULES///
if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a Female with very activity and being overweight with high blood pressure, diabetes, high cholesterol, and lactose intolerance who follows a vegetarian diet, it is important to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods, and to incorporate low-fat dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods, and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure, diabetes, and high cholesterol who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In the absence of high cholesterol, incorporating very amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and diabetes, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In the absence of high cholesterol, incorporating very amounts of healthy fats from sources such as nuts, seeds, and olive oil can also be beneficial.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet but has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to avoid or limit dairy products that contain lactose. You can also consider using lactose-free dairy products or dairy alternatives to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan that takes your lactose intolerance into account.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and diabetes, who does not follow a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to incorporate low-fat dairy products to ensure adequate calcium intake. Working with a registered dietitian can also be helpful in creating a personalized meal plan.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and has lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing your lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and high cholesterol, who follows a vegetarian diet and does not have lactose intolerance, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as legumes and soy products. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet but has lactose intolerance and does not have diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. In addition, incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `As a Female with very activity and being overweight with high blood pressure and high cholesterol, who does not follow a vegetarian diet and has both lactose intolerance and no diabetes, it is recommended to focus on consuming whole, nutrient-dense foods such as fruits, vegetables, whole grains, and lean sources of protein such as poultry, fish, and lean cuts of red meat. It is also recommended to limit processed and high-fat foods and to work with a registered dietitian to ensure adequate nutrient intake while managing lactose intolerance. Incorporating foods rich in soluble fiber such as oats, barley, and legumes, and sources of omega-3 fatty acids such as fatty fish or fish oil supplements, can help to lower cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a Female with very activity and being overweight with high blood pressure, who follows a vegetarian diet and has lactose intolerance but no diabetes or high cholesterol, it is recommended to focus on consuming a variety of plant-based protein sources such as legumes, tofu, tempeh, and seitan, and ensuring adequate intake of essential nutrients such as vitamin B12, iron, and zinc, which may be low in vegetarian diets. Incorporating foods rich in potassium, such as bananas and sweet potatoes, can help to lower blood pressure. It is also recommended to explore lactose-free or plant-based alternatives to dairy products to meet calcium and vitamin D needs. Working with a registered dietitian can help to develop a balanced vegetarian meal plan while addressing any individual nutritional concerns.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the provided conditions, it seems that you are a Female with very activity level, overweight (with a BMI between 25 and 29.9), and have high blood pressure and diabetes. Depending on your individual health goals and needs, it may be beneficial to work with a registered dietitian to develop a personalized nutrition plan that is appropriate for your health condition. In general, a healthy diet for someone with high blood pressure and diabetes should include plenty of fresh fruits and vegetables, lean protein sources, and whole grains while limiting sodium, added sugars, and saturated fats. It is also important to monitor your carbohydrate intake and distribute them evenly throughout the day to help manage blood sugar levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `If a Female's activity level is very, their BMI is between 25 and 29.9, they have high blood pressure, and they do not have diabetes or high cholesterol, but they are lactose intolerant, it is important to ensure that they are still consuming enough calcium from other sources, such as leafy greens, fortified non-dairy milks, and calcium-fortified foods, to maintain bone health. It may also be helpful to work with a registered dietitian to ensure they are meeting all of their nutrient needs.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `my advice for a Female with very activity level, overweight (bmi >= 25 and bmi <= 29.9), with high blood pressure, no diabetes, no high cholesterol, and who is not vegetarian or lactose intolerant, is to focus on a balanced and nutritious diet that is low in sodium and saturated fats. They should consume whole grains, lean protein sources such as fish and skinless poultry, and a variety of fruits and vegetables. It is important for them to control portion sizes and limit their intake of processed and high-calorie foods. Additionally, regular physical activity should be incorporated into their routine to aid in weight loss and improve overall health.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a Female with very activity, a BMI between 25 and 29.9, and diabetes, high blood pressure, and high cholesterol, who is also vegetarian and lactose-tolerant, but doesn't have high blood pressure, is to focus on a balanced diet with plenty of whole, nutrient-dense foods like fruits, vegetables, whole grains, and lean proteins. It's important to limit processed and high-fat foods, including high-fat dairy products and meat alternatives, and to include regular physical activity as part of a healthy lifestyle. Consult with a registered dietitian for personalized guidance and support.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This condition represents a Female with very activity level, overweight BMI, no blood pressure issues, but with diabetes and high cholesterol who follows a vegetarian diet and is lactose intolerant. Based on this information, my advice would be to focus on a plant-based, low-glycemic index diet that emphasizes whole, unprocessed foods such as vegetables, fruits, legumes, nuts, and seeds. Foods with a high glycemic index, such as refined carbohydrates and sugars, should be avoided or limited as they can cause a rapid rise in blood sugar levels. It may also be helpful to work with a registered dietitian to develop a personalized meal plan that meets individual needs and preferences while addressing specific health concerns. Additionally, regular physical activity and stress management techniques can also be beneficial for managing diabetes and high cholesterol.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition indicates that a Female with a very level of physical activity who has a BMI between 25 and 29.9 and does not have high blood pressure but has diabetes and high cholesterol, and is either a lacto-vegetarian or has lactose intolerance. Based on this information, it is recommended to limit the intake of foods high in saturated fats and added sugars, such as processed and fried foods, and instead focus on a balanced diet that includes lean proteins, whole grains, fruits, vegetables, and healthy fats such as those found in nuts and seeds. Additionally, regular physical activity and weight management are also important in managing diabetes and cholesterol levels. Consulting with a registered dietitian can also provide personalized and comprehensive guidance.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `given the presence of diabetes and high cholesterol, it is generally recommended to limit or avoid foods high in saturated and trans fats, added sugars, and refined carbohydrates, and instead opt for a diet rich in fruits, vegetables, whole grains, lean protein sources, and healthy fats such as those found in nuts, seeds, and fatty fish. It may also be beneficial to work with a registered dietitian to develop a personalized meal plan to meet individual needs and goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = ` if you are a Female with very physical activity, and your BMI falls between 25 and 29.9, and you have diabetes but do not have high blood pressure or high cholesterol, and you are a vegetarian who can consume dairy, I would suggest that you consume a well-balanced diet that includes a variety of whole grains, legumes, fruits, vegetables, low-fat dairy products, and lean sources of protein. It's also important to limit your intake of processed and high-sugar foods and drinks, and to stay hydrated by drinking plenty of water. It's a good idea to work with a registered dietitian to help you develop a personalized nutrition plan to meet your specific needs and goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This code block represents a specific set of criteria for a Female individual who has a very level of physical activity, is overweight with a BMI between 25 and 29.9, has no blood pressure issues, has diabetes, has no high cholesterol, is vegetarian, and lactose intolerant. As a dietitian, I would recommend a diet that is low in saturated and trans fats, with a focus on whole grains, vegetables, fruits, lean protein sources such as legumes, fish and skinless poultry, and plant-based fats such as olive oil, nuts and seeds. For this individual, it would be particularly important to carefully plan meals to ensure they are getting enough essential nutrients, such as calcium and vitamin B12, which are typically found in dairy products. Alternative sources of these nutrients, such as fortified plant-based milks and supplements, should be considered. It would also be important to monitor blood sugar levels regularly and adjust the diet as needed to keep them under control. Regular physical activity and stress management techniques should also be incorporated into this individual's lifestyle to manage their diabetes effectively.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given conditions, the individual is a Female with very activity and has a BMI between 25 and 29.9, which indicates he is overweight. He also has no blood pressure issues, but has diabetes and does not consume meat or eggs. It is important for him to consume a well-balanced diet that meets his nutritional needs while also helping to manage his diabetes. He should focus on consuming whole grains, fruits, vegetables, nuts, and seeds to provide his body with essential nutrients and fiber. He may also benefit from incorporating plant-based sources of protein such as legumes and tofu into his diet. It is important for him to monitor his blood sugar levels and consult with a registered dietitian to help create a personalized meal plan. Additionally, regular exercise and weight management should be incorporated into his lifestyle to help manage his diabetes and overall health.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given conditions, you are a veryly active Female who is overweight but does not have high blood pressure, does not have diabetes, and is vegetarian and lactose intolerant. However, you have high cholesterol.

To help manage your cholesterol levels, it's recommended to limit your intake of saturated and trans fats, while increasing your intake of fiber-rich foods such as fruits, vegetables, and whole grains. You may also want to consider incorporating heart-healthy fats, such as those found in nuts, seeds, and fatty fish, into your diet. It's important to work with a registered dietitian to develop an individualized plan that meets your specific needs and goals. Additionally, regular physical activity and maintaining a healthy weight can also help improve cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with very activity and a BMI between 25 and 29.9, who does not have high blood pressure or diabetes but does have high cholesterol, a plant-based diet rich in fruits, vegetables, whole grains, and legumes may be recommended. In addition, reducing saturated and trans fats, and increasing intake of healthy fats such as omega-3 fatty acids found in fatty fish, nuts, and seeds may help improve cholesterol levels. Regular physical activity and weight management are also important components of managing high cholesterol.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with very activity and a BMI between 25 and 29.9 who does not have high blood pressure or diabetes but does have high cholesterol and is either vegetarian or lactose intolerant, I recommend following a balanced diet that is low in saturated and trans fats, high in fiber, and includes plenty of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may be helpful to incorporate cholesterol-lowering foods such as oats, nuts, and fatty fish, as well as plant-based sources of protein like legumes, tofu, and tempeh. Consider working with a registered dietitian to develop a personalized nutrition plan that meets your needs and preferences.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the provided information, as a dietitian, my advice for a Female with very activity and a BMI between 25 and 29.9, who doesn't have high blood pressure, diabetes or high cholesterol, and is vegetarian and lactose intolerant, is to incorporate a variety of plant-based protein sources in their diet such as beans, lentils, tofu, and nuts to meet their daily protein requirements. It's also important to consume a wide range of fruits and vegetables to get enough vitamins, minerals, and fiber. Choosing lactose-free dairy alternatives, such as soy or almond milk, can provide additional calcium and vitamin D. Lastly, reducing processed and high-fat foods, and cooking with healthy oils like olive or avocado oil can help maintain a healthy weight and reduce the risk of heart disease`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `If you're a veryly active overweight Female with no blood pressure issues, diabetes, or cholesterol concerns, but do not consume dairy products and follow a vegetarian diet, then it's important to ensure that you're getting enough protein, calcium, and vitamin D from plant-based sources. Consider incorporating foods such as beans, lentils, tofu, nuts, seeds, and fortified non-dairy milks into your diet to meet your nutritional needs. Additionally, be mindful of portion sizes and choose mostly whole, minimally processed foods. Regular physical activity can also help support your health and weight management goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This condition refers to a veryly active overweight Female with no high blood pressure, no diabetes, no high cholesterol, who is not a vegetarian but lactose intolerant. Based on this information, my advice would be to focus on non-dairy sources of protein and calcium, such as nuts, seeds, legumes, and leafy greens. It may also be helpful to try lactose-free dairy products or consider taking a lactase enzyme supplement to aid in digestion. Additionally, maintaining a balanced and varied diet with appropriate portion sizes can aid in weight management. It is also important to engage in regular physical activity and prioritize adequate sleep and stress management. A registered dietitian can provide more personalized recommendations and support.`;
}
///END FEMALE OV VERY RULESS//

///START FEMALE OB SEDENTARY RULES///
if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a dietitian, it is important to take a comprehensive approach to manage your health conditions. Being a sedentary Female with a BMI of 30 or higher and having diabetes, high blood pressure, high cholesterol, and lactose intolerance means that you are at increased risk for various health complications, such as heart disease, stroke, and kidney disease.
It is essential to follow a healthy eating pattern that can help control your blood glucose, blood pressure, and lipid levels, and aid in weight loss. As a vegetarian, you should focus on consuming a variety of plant-based protein sources, such as legumes, nuts, seeds, soy products, and whole grains. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are lactose intolerant, you can opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D. It is also important to maintain adequate hydration by drinking plenty of water and other low-calorie fluids.
It is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight. This can also help reduce your risk of developing heart disease and other health complications.
In conclusion, it is essential to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. By adopting a healthy eating pattern, engaging in regular physical activity, and making other lifestyle modifications, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being a vegetarian and lactose intolerant, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a lactose intolerant vegetarian, it is important to consume a variety of plant-based protein sources such as legumes, nuts, seeds, soy products, and whole grains to meet your protein requirements. You can also opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your calcium needs.
Focus on consuming non-starchy vegetables, fruits, and whole grains, which provide you with the necessary vitamins, minerals, and fiber. It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, and instead choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Additionally, it is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and a vegetarian.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also consuming dairy products but not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are not lactose intolerant, you can consume dairy products such as milk, cheese, and yogurt as a source of calcium and other essential nutrients. However, it is important to choose low-fat or fat-free dairy products to reduce your saturated fat intake.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite not being a vegetarian but lactose tolerant.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being lactose intolerant and not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
Since you are lactose intolerant, you should avoid consuming foods that contain lactose, such as milk, cheese, and yogurt. Instead, you can choose lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your nutrient needs.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and not following a vegetarian diet.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a sedentary Female with a BMI of 30 or higher, diabetes, high blood pressure, and a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your health conditions effectively.
To ensure you are consuming enough protein, iron, and other essential nutrients, incorporate a variety of plant-based protein sources, iron-rich foods, and low-fat or non-fat dairy products. Focus on non-starchy vegetables, fruits, whole grains, and healthy fats, while limiting your intake of added sugars, refined carbohydrates, and saturated and trans fats.
Engage in regular physical activity for at least 150 minutes per week to help reduce your risk of heart disease and other health complications. Work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or higher and have diabetes, high blood pressure, and are a vegetarian who does not consume dairy products, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a vegetarian, it is important to ensure that you are consuming enough protein, iron, and other essential nutrients. You can do this by incorporating a variety of plant-based protein sources, such as legumes, tofu, tempeh, nuts, and seeds. Additionally, consuming iron-rich foods, such as leafy green vegetables, whole grains, and fortified cereals, can help meet your iron needs.
Since you do not consume dairy products, it is important to ensure that you are getting enough calcium and vitamin D. You can do this by incorporating plant-based milk alternatives fortified with these nutrients, as well as consuming calcium-rich foods such as leafy green vegetables, nuts, and seeds.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on non-starchy vegetables, fruits, whole grains, and healthy fats, such as avocados, nuts, and seeds. These foods provide essential vitamins, minerals, fiber, and healthy fats that can help manage your health conditions.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a dietitian, if you are a sedentary Female with a BMI of 30 or more, diabetes, high blood pressure, and lactose intolerance but not cholesterol issues, it is important to focus on a well-balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources.
Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = ` if you are a sedentary Female with a BMI of 30 or more, diabetes, and high blood pressure, but without cholesterol or lactose issues, and not following a vegetarian diet, it is important to focus on a healthy, balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources. Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial.
In addition, it is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a vegetarian diet with lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a lactose-free vegetarian diet, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, high cholesterol, and lactose intolerance, but not following a vegetarian diet, it is important to focus on a well-balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and high cholesterol, but without diabetes and lactose or vegetarian issues, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and following a vegetarian diet with lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and following a vegetarian diet without lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and without diabetes or high cholesterol but consuming lactose, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It is also important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, high blood pressure, and without diabetes, high cholesterol, and following a non-vegetarian diet without lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. Reducing your intake of red meat and processed meats, as well as limiting your intake of alcohol, can also be helpful in managing heart health. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet with lactose consumption but without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish. For lactose consumption, alternative sources of calcium such as fortified plant-based milks, and calcium supplements if needed, can be considered.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet without lactose consumption and without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish.
For lactose intolerance, alternative sources of calcium such as fortified plant-based milks, calcium-fortified tofu, or leafy green vegetables can be considered. Additionally, it is important to ensure adequate intake of vitamin D, which can be obtained from fatty fish, egg yolks, or supplements.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a sedentary Female with a BMI of 30 or greater, no high blood pressure but with diabetes and high cholesterol, and who is not a vegetarian but has lactose intolerance, here are some dietary recommendations:
Reduce intake of saturated and trans fats: Choose lean meats, fish, and poultry without the skin, and avoid fried foods, baked goods, and processed snacks that contain high amounts of unhealthy fats.
Control portion sizes: Eating smaller, more frequent meals throughout the day can help manage blood sugar levels and reduce the risk of overeating. Use measuring cups or a food scale to keep portions in check.
Choose complex carbohydrates: Focus on whole grains, fruits, vegetables, and legumes, which are high in fiber and important nutrients. These foods can help regulate blood sugar levels and promote healthy digestion.
Limit sugar and salt: Avoid sugary drinks and desserts, and limit the amount of added salt in your diet. Look for low-sodium options and try flavoring foods with herbs and spices instead.
Consider lactose-free dairy alternatives: If lactose intolerance is an issue, try lactose-free or plant-based milk and yogurt alternatives that are fortified with calcium and vitamin D.
It's important to work with a registered dietitian to develop a personalized meal plan that meets your individual needs and preferences. Additionally, engaging in regular physical activity can also help manage diabetes and improve overall health.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if a Female patient has a sedentary lifestyle, BMI greater than or equal to 30, no high blood pressure, and has diabetes and high cholesterol but is not a vegetarian and can tolerate lactose, I would recommend a diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should also limit their intake of processed and high-fat foods and focus on consuming lean protein sources, such as poultry and fish. In addition, they should incorporate whole grains, fruits, and vegetables into their diet. If they consume dairy products, I would recommend low-fat or non-fat options. They should also be mindful of their portion sizes and aim to consume a balanced diet that meets their individual nutrient needs.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if a Female patient has a sedentary lifestyle, BMI greater than or equal to 30, no high blood pressure, has diabetes but does not have high cholesterol and is a vegetarian and can tolerate lactose, I would recommend a plant-based diet that is rich in whole grains, legumes, fruits, and vegetables. They should focus on consuming foods that are high in fiber, vitamins, and minerals, and limit their intake of processed and high-fat foods. They should also consider incorporating low-fat dairy products or plant-based milk alternatives into their diet for additional nutrients such as calcium and vitamin D. It is important to monitor their blood sugar levels and work with a healthcare provider to adjust their medication as needed to maintain healthy blood sugar levels.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This set of conditions describes a sedentary Female with a BMI greater than or equal to 30, without high blood pressure, with diabetes, no high cholesterol, who is either vegetarian or lactose intolerant. Here is some advice that could be useful:
Manage your diabetes: If you have diabetes, it is important to manage your blood sugar levels through diet, exercise, and medication. Consult with a healthcare professional, such as a doctor or dietitian, to develop a personalized diabetes management plan.
Focus on weight loss: Given your high BMI and sedentary lifestyle, losing weight can help improve your overall health and reduce your risk of diabetes-related complications. Aim for a healthy rate of weight loss by making sustainable changes to your diet and increasing your physical activity level.
Eat a balanced diet: Whether you are vegetarian or lactose intolerant, it is important to consume a balanced diet that meets your nutritional needs. Focus on incorporating whole, nutrient-dense foods such as fruits, vegetables, whole grains, lean protein sources, and healthy fats. Avoid highly processed or high-sugar foods, as these can negatively impact your blood sugar levels.
Consider seeing a registered dietitian: A registered dietitian can provide personalized nutrition advice that takes into account your individual health status and dietary preferences. They can also help you develop a diabetes-friendly meal plan and make sustainable changes to your diet.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a sedentary Female with BMI >= 30, high blood pressure, and diabetes, it is advisable to avoid high cholesterol foods and to follow a vegetarian diet that is also lactose-free. A diet rich in fruits, vegetables, and whole grains, along with lean protein sources such as beans and legumes, can help control blood sugar and blood pressure. It is important to monitor blood glucose levels regularly and work with a healthcare professional to manage diabetes`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a sedentary Female with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Increase the intake of fruits and vegetables to ensure adequate intake of essential vitamins, minerals, and fiber.
Include plant-based sources of protein such as beans, lentils, nuts, and seeds in your meals.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a sedentary Female with a BMI of 30 or higher and do not have high blood pressure or diabetes, but have high cholesterol and are a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your cholesterol levels.
It is recommended to follow a vegetarian diet that includes a variety of fruits, vegetables, whole grains, legumes, and healthy fats. These foods provide a range of nutrients that can help improve your cholesterol levels.
You should focus on incorporating sources of soluble fiber such as oats, barley, beans, and lentils, as these have been shown to lower LDL (bad) cholesterol. It is also important to include foods that are rich in healthy fats, such as nuts, seeds, avocado, and olive oil, as these can help improve cholesterol levels.
In addition to a healthy diet, regular physical activity can also help improve cholesterol levels. Aim for at least 150 minutes of moderate-intensity exercise, such as brisk walking, cycling, or swimming, per week.
It is also important to limit your intake of saturated and trans fats, which can increase cholesterol levels. Avoid or limit processed and fried foods, as well as full-fat dairy products.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a sedentary Female with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a sedentary Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Monitor vitamin B12 levels and consider taking a supplement if necessary as it is not naturally present in plant-based foods.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `my advice for a sedentary Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegan diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds, as well as tofu and tempeh.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate plant-based sources of calcium such as fortified plant-based milk, tofu, and dark leafy greens.
Monitor vitamin B12 levels and consider taking a supplement as it is not naturally present in plant-based foods.
Consider including sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts to support heart health.
Limit processed and high-fat vegan foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance to ensure that nutrient needs are met on a vegan diet.`;
}
else if (gender === "Female" && activity === "sedentary" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a sedentary Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Monitor portion sizes to manage calorie intake and promote weight loss.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
////END FEMALE OB SEDENDTARY RULES////

///START FEMALE OB LIGHT RULES///
if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `As a dietitian, it is important to take a comprehensive approach to manage your health conditions. Being a lightly Female with a BMI of 30 or higher and having diabetes, high blood pressure, high cholesterol, and lactose intolerance means that you are at increased risk for various health complications, such as heart disease, stroke, and kidney disease.
It is essential to follow a healthy eating pattern that can help control your blood glucose, blood pressure, and lipid levels, and aid in weight loss. As a vegetarian, you should focus on consuming a variety of plant-based protein sources, such as legumes, nuts, seeds, soy products, and whole grains. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are lactose intolerant, you can opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D. It is also important to maintain adequate hydration by drinking plenty of water and other low-calorie fluids.
It is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight. This can also help reduce your risk of developing heart disease and other health complications.
In conclusion, it is essential to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. By adopting a healthy eating pattern, engaging in regular physical activity, and making other lifestyle modifications, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being a vegetarian and lactose intolerant, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a lactose intolerant vegetarian, it is important to consume a variety of plant-based protein sources such as legumes, nuts, seeds, soy products, and whole grains to meet your protein requirements. You can also opt for lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your calcium needs.
Focus on consuming non-starchy vegetables, fruits, and whole grains, which provide you with the necessary vitamins, minerals, and fiber. It is important to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, and instead choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Additionally, it is crucial to engage in regular physical activity, such as brisk walking or other low-impact exercises, to help control blood glucose, blood pressure, and weight.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and a vegetarian.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also consuming dairy products but not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Since you are not lactose intolerant, you can consume dairy products such as milk, cheese, and yogurt as a source of calcium and other essential nutrients. However, it is important to choose low-fat or fat-free dairy products to reduce your saturated fat intake.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite not being a vegetarian but lactose tolerant.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or higher and have diabetes, high blood pressure, and high cholesterol, while also being lactose intolerant and not following a vegetarian diet, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
Since you are lactose intolerant, you should avoid consuming foods that contain lactose, such as milk, cheese, and yogurt. Instead, you can choose lactose-free dairy products or plant-based milk alternatives fortified with calcium and vitamin D to ensure that you are meeting your nutrient needs.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on lean protein sources, such as lean meat, poultry, fish, and eggs. Additionally, you should consume plenty of non-starchy vegetables, fruits, and whole grains to provide you with the necessary vitamins, minerals, and fiber.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats, such as avocados, nuts, seeds, and fatty fish.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.
It is also important to work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals. They can help ensure that you are getting all the necessary nutrients, vitamins, and minerals while also managing your health conditions effectively.
In conclusion, managing your health conditions requires a comprehensive approach that includes a healthy and balanced diet, regular physical activity, and other lifestyle modifications. By making these changes, you can improve your overall health and reduce your risk of complications associated with obesity, diabetes, high blood pressure, and high cholesterol, despite being lactose intolerant and not following a vegetarian diet.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `As a lightly Female with a BMI of 30 or higher, diabetes, high blood pressure, and a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your health conditions effectively.
To ensure you are consuming enough protein, iron, and other essential nutrients, incorporate a variety of plant-based protein sources, iron-rich foods, and low-fat or non-fat dairy products. Focus on non-starchy vegetables, fruits, whole grains, and healthy fats, while limiting your intake of added sugars, refined carbohydrates, and saturated and trans fats.
Engage in regular physical activity for at least 150 minutes per week to help reduce your risk of heart disease and other health complications. Work with a healthcare provider and a registered dietitian to develop an individualized plan that meets your unique needs and goals.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or higher and have diabetes, high blood pressure, and are a vegetarian who does not consume dairy products, it is essential to make changes to your diet and lifestyle to manage your health conditions effectively.
As a vegetarian, it is important to ensure that you are consuming enough protein, iron, and other essential nutrients. You can do this by incorporating a variety of plant-based protein sources, such as legumes, tofu, tempeh, nuts, and seeds. Additionally, consuming iron-rich foods, such as leafy green vegetables, whole grains, and fortified cereals, can help meet your iron needs.
Since you do not consume dairy products, it is important to ensure that you are getting enough calcium and vitamin D. You can do this by incorporating plant-based milk alternatives fortified with these nutrients, as well as consuming calcium-rich foods such as leafy green vegetables, nuts, and seeds.
It is important to consume a balanced diet that includes a variety of nutrient-dense foods. You should focus on non-starchy vegetables, fruits, whole grains, and healthy fats, such as avocados, nuts, and seeds. These foods provide essential vitamins, minerals, fiber, and healthy fats that can help manage your health conditions.
It is crucial to limit your intake of added sugars, refined carbohydrates, and saturated and trans fats, as they can worsen your health conditions. Instead, choose foods that are low in glycemic index, high in fiber, and rich in healthy fats.
Regular physical activity is also essential for managing blood glucose, blood pressure, and weight. Engage in regular physical activity such as brisk walking, cycling, or swimming for at least 150 minutes per week to help reduce your risk of heart disease and other health complications.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `As a dietitian, if you are a lightly Female with a BMI of 30 or more, diabetes, high blood pressure, and lactose intolerance but not cholesterol issues, it is important to focus on a well-balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources.
Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = ` if you are a lightly Female with a BMI of 30 or more, diabetes, and high blood pressure, but without cholesterol or lactose issues, and not following a vegetarian diet, it is important to focus on a healthy, balanced diet to help manage your conditions.
You should aim to limit your intake of simple carbohydrates and added sugars while increasing your intake of high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources. Incorporating heart-healthy fats, such as those found in fatty fish, nuts, and seeds, can also be beneficial.
In addition, it is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a vegetarian diet with lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and high cholesterol, and following a lactose-free vegetarian diet, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, high cholesterol, and lactose intolerance, but not following a vegetarian diet, it is important to focus on a well-balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and high cholesterol, but without diabetes and lactose or vegetarian issues, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and following a vegetarian diet with lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and following a vegetarian diet without lactose intolerance, but without high cholesterol or diabetes, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and plant-based protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and without diabetes or high cholesterol but consuming lactose, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
For individuals with lactose intolerance, it is important to find alternative sources of calcium, such as leafy green vegetables, fortified plant-based milks, and calcium supplements if needed. It is also important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, high blood pressure, and without diabetes, high cholesterol, and following a non-vegetarian diet without lactose intolerance, it is important to focus on a balanced diet that supports heart health.
You should aim to limit your intake of saturated and trans fats while increasing your intake of heart-healthy fats, such as those found in nuts, seeds, and fatty fish. Incorporating high-fiber, nutrient-dense foods such as fruits, vegetables, whole grains, and lean protein sources can also be beneficial.
It is important to monitor your sodium intake and try to limit processed and high-sodium foods to help manage your blood pressure. Reducing your intake of red meat and processed meats, as well as limiting your intake of alcohol, can also be helpful in managing heart health. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet with lactose consumption but without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish. For lactose consumption, alternative sources of calcium such as fortified plant-based milks, and calcium supplements if needed, can be considered.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or more, diabetes, high cholesterol, and following a vegetarian diet without lactose consumption and without high blood pressure, it is important to focus on a balanced diet that helps to manage your blood sugar and cholesterol levels.
In general, a balanced and healthy diet for diabetes should consist of whole foods that are high in fiber and low in added sugars, saturated and trans fats. This can include vegetables, whole grains, legumes, nuts, and seeds, as well as lean protein sources such as poultry or fish.
For lactose intolerance, alternative sources of calcium such as fortified plant-based milks, calcium-fortified tofu, or leafy green vegetables can be considered. Additionally, it is important to ensure adequate intake of vitamin D, which can be obtained from fatty fish, egg yolks, or supplements.
It is also important to monitor your carbohydrate intake and spread it evenly throughout the day to avoid spikes in blood sugar levels. Eating regular meals and snacks that contain a balance of carbohydrates, protein, and healthy fats can also be helpful in managing blood sugar levels.
For individuals with high cholesterol, limiting saturated and trans fats, while increasing heart-healthy fats such as those found in nuts, seeds, and fatty fish, can be beneficial. Incorporating foods high in soluble fiber, such as oats, barley, and legumes, can also help to lower cholesterol levels. It may be helpful to work with a registered dietitian to develop a personalized meal plan and ensure that your nutritional needs are being met while managing your health conditions.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a lightly Female with a BMI of 30 or greater, no high blood pressure but with diabetes and high cholesterol, and who is not a vegetarian but has lactose intolerance, here are some dietary recommendations:
Reduce intake of saturated and trans fats: Choose lean meats, fish, and poultry without the skin, and avoid fried foods, baked goods, and processed snacks that contain high amounts of unhealthy fats.
Control portion sizes: Eating smaller, more frequent meals throughout the day can help manage blood sugar levels and reduce the risk of overeating. Use measuring cups or a food scale to keep portions in check.
Choose complex carbohydrates: Focus on whole grains, fruits, vegetables, and legumes, which are high in fiber and important nutrients. These foods can help regulate blood sugar levels and promote healthy digestion.
Limit sugar and salt: Avoid sugary drinks and desserts, and limit the amount of added salt in your diet. Look for low-sodium options and try flavoring foods with herbs and spices instead.
Consider lactose-free dairy alternatives: If lactose intolerance is an issue, try lactose-free or plant-based milk and yogurt alternatives that are fortified with calcium and vitamin D.
It's important to work with a registered dietitian to develop a personalized meal plan that meets your individual needs and preferences. Additionally, engaging in regular physical activity can also help manage diabetes and improve overall health.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `if a Female patient has a lightly lifestyle, BMI greater than or equal to 30, no high blood pressure, and has diabetes and high cholesterol but is not a vegetarian and can tolerate lactose, I would recommend a diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should also limit their intake of processed and high-fat foods and focus on consuming lean protein sources, such as poultry and fish. In addition, they should incorporate whole grains, fruits, and vegetables into their diet. If they consume dairy products, I would recommend low-fat or non-fat options. They should also be mindful of their portion sizes and aim to consume a balanced diet that meets their individual nutrient needs.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `if a Female patient has a lightly lifestyle, BMI greater than or equal to 30, no high blood pressure, has diabetes but does not have high cholesterol and is a vegetarian and can tolerate lactose, I would recommend a plant-based diet that is rich in whole grains, legumes, fruits, and vegetables. They should focus on consuming foods that are high in fiber, vitamins, and minerals, and limit their intake of processed and high-fat foods. They should also consider incorporating low-fat dairy products or plant-based milk alternatives into their diet for additional nutrients such as calcium and vitamin D. It is important to monitor their blood sugar levels and work with a healthcare provider to adjust their medication as needed to maintain healthy blood sugar levels.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `This set of conditions describes a lightly Female with a BMI greater than or equal to 30, without high blood pressure, with diabetes, no high cholesterol, who is either vegetarian or lactose intolerant. Here is some advice that could be useful:
Manage your diabetes: If you have diabetes, it is important to manage your blood sugar levels through diet, exercise, and medication. Consult with a healthcare professional, such as a doctor or dietitian, to develop a personalized diabetes management plan.
Focus on weight loss: Given your high BMI and lightly lifestyle, losing weight can help improve your overall health and reduce your risk of diabetes-related complications. Aim for a healthy rate of weight loss by making sustainable changes to your diet and increasing your physical activity level.
Eat a balanced diet: Whether you are vegetarian or lactose intolerant, it is important to consume a balanced diet that meets your nutritional needs. Focus on incorporating whole, nutrient-dense foods such as fruits, vegetables, whole grains, lean protein sources, and healthy fats. Avoid highly processed or high-sugar foods, as these can negatively impact your blood sugar levels.
Consider seeing a registered dietitian: A registered dietitian can provide personalized nutrition advice that takes into account your individual health status and dietary preferences. They can also help you develop a diabetes-friendly meal plan and make sustainable changes to your diet.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a lightly Female with BMI >= 30, high blood pressure, and diabetes, it is advisable to avoid high cholesterol foods and to follow a vegetarian diet that is also lactose-free. A diet rich in fruits, vegetables, and whole grains, along with lean protein sources such as beans and legumes, can help control blood sugar and blood pressure. It is important to monitor blood glucose levels regularly and work with a healthcare professional to manage diabetes`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a lightly Female with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Increase the intake of fruits and vegetables to ensure adequate intake of essential vitamins, minerals, and fiber.
Include plant-based sources of protein such as beans, lentils, nuts, and seeds in your meals.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `if you are a lightly Female with a BMI of 30 or higher and do not have high blood pressure or diabetes, but have high cholesterol and are a vegetarian who consumes dairy products, it is important to make changes to your diet and lifestyle to manage your cholesterol levels.
It is recommended to follow a vegetarian diet that includes a variety of fruits, vegetables, whole grains, legumes, and healthy fats. These foods provide a range of nutrients that can help improve your cholesterol levels.
You should focus on incorporating sources of soluble fiber such as oats, barley, beans, and lentils, as these have been shown to lower LDL (bad) cholesterol. It is also important to include foods that are rich in healthy fats, such as nuts, seeds, avocado, and olive oil, as these can help improve cholesterol levels.
In addition to a healthy diet, regular physical activity can also help improve cholesterol levels. Aim for at least 150 minutes of moderate-intensity exercise, such as brisk walking, cycling, or swimming, per week.
It is also important to limit your intake of saturated and trans fats, which can increase cholesterol levels. Avoid or limit processed and fried foods, as well as full-fat dairy products.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a lightly Female with a BMI of 30 or greater, and no history of diabetes or high blood pressure but high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Consume foods that are rich in omega-3 fatty acids, such as fatty fish, flaxseed, and chia seeds to help lower cholesterol levels.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `my advice for a lightly Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegetarian diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Monitor vitamin B12 levels and consider taking a supplement if necessary as it is not naturally present in plant-based foods.
Limit processed and high-fat vegetarian foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `my advice for a lightly Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who follows a vegan diet and is lactose intolerant would be as follows:
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose plant-based sources of protein such as beans, lentils, nuts, and seeds, as well as tofu and tempeh.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate plant-based sources of calcium such as fortified plant-based milk, tofu, and dark leafy greens.
Monitor vitamin B12 levels and consider taking a supplement as it is not naturally present in plant-based foods.
Consider including sources of omega-3 fatty acids such as flaxseed, chia seeds, and walnuts to support heart health.
Limit processed and high-fat vegan foods such as fried foods, pastries, and desserts.
Consult with a registered dietitian for individualized dietary recommendations and guidance to ensure that nutrient needs are met on a vegan diet.`;
}
else if (gender === "Female" && activity === "lightly" && bmi >= 30 && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `my advice for a lightly Female with a BMI of 30 or greater, and no history of diabetes, high blood pressure, or high cholesterol, who is not following a vegetarian diet but is lactose intolerant would be as follows:
Choose lean sources of protein such as skinless chicken, fish, lean cuts of beef, and plant-based sources of protein such as beans, lentils, nuts, and seeds.
Include a variety of fruits and vegetables in your meals to provide essential vitamins, minerals, and fiber.
Choose whole grains such as brown rice, quinoa, and whole wheat bread instead of refined carbohydrates.
Use healthy fats such as olive oil, avocado, and nuts instead of saturated and trans fats.
Incorporate lactose-free dairy alternatives such as almond milk, soy milk, and tofu to meet calcium and vitamin D needs.
Limit processed and high-fat foods such as fried foods, pastries, and desserts.
Monitor portion sizes to manage calorie intake and promote weight loss.
Consult with a registered dietitian for individualized dietary recommendations and guidance.`;
}
///END FEMALE OB LIGHT RULES///

///START FEMALE OB MODERATE RULESS///
if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `my advice for a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, high cholesterol, is a vegetarian, and has lactose intolerance is to follow a balanced and nutritious diet that helps manage their health conditions. This can include consuming high-fiber foods, lean protein sources, healthy fats, and low-glycemic index carbohydrates while limiting saturated and trans fats, added sugars, and sodium. Additionally, incorporating regular physical activity and working with a healthcare provider to manage their health conditions can help improve their overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is a vegetarian but has lactose intolerance, my advice as a dietitian would be to consume a well-planned plant-based diet that meets all the essential nutrient requirements, including calcium, vitamin D, and vitamin B12, which may be lacking in a lactose-free diet. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. Additionally, it is crucial to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is not a vegetarian, but has lactose intolerance, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also essential to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity, along with working with a healthcare provider to manage these health conditions, can also be beneficial.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, and is not a vegetarian and also has lactose intolerance, my advice as a dietitian would be to consume a balanced and varied diet that includes lean protein sources, healthy fats, low-glycemic index carbohydrates, and plenty of fruits and vegetables while avoiding or limiting lactose-containing foods and beverages. Good sources of calcium and vitamin D, which may be lacking in a lactose-free diet, include fortified plant-based milks, dark leafy greens, almonds, and salmon. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions can help improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes and is a vegetarian with lactose intolerance, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. It is also essential to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is a vegetarian, and has lactose intolerance, but does not have high cholesterol, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions effectively can improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is not a vegetarian but has lactose intolerance and does not have high cholesterol, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also important to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity and working with a healthcare provider to manage these health conditions effectively can also be beneficial for overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is also important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian, and has lactose intolerance but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources, such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person has high cholesterol, they should limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian and also lactose intolerant but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. This person should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods, as these can increase cholesterol levels. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, and not lactose intolerant but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes a variety of plant-based protein sources like legumes, nuts, and seeds. This person should also ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which are often found in animal products but can be obtained through fortified plant-based sources or supplements. Additionally, since this person has high blood pressure, they should limit their intake of sodium and include plenty of fruits and vegetables in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with moderate activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, not lactose intolerant, but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a well-balanced diet that is rich in a variety of whole plant-based foods. This person should aim for a variety of nutrient-dense foods such as vegetables, fruits, whole grains, legumes, nuts, and seeds. They should make sure to include plant-based protein sources such as tofu, tempeh, and seitan. Additionally, they should ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which can be obtained through fortified plant-based sources or supplements. This person should limit their intake of added sugars, saturated and trans fats, and processed foods. Since this person has high blood pressure, they should also limit their intake of sodium and include plenty of potassium-rich foods such as bananas, avocados, and leafy greens in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `I would recommend that the individual work with a registered dietitian to develop a personalized meal plan that takes into account their lactose intolerance and dietary preferences. It may also be important to limit sodium intake in order to manage their blood pressure. Some options to consider include incorporating more plant-based protein sources, such as beans and lentils, and incorporating calcium-rich non-dairy alternatives, such as fortified almond milk or soy milk, to ensure they are meeting their nutrient needs. It is important for this individual to prioritize regular physical activity and work with their healthcare provider to manage their blood pressure and overall health.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `If you are a Female with a moderate activity level and a BMI of 30 or greater, and you have high blood pressure and do not have diabetes or high cholesterol, and you are not a vegetarian or lactose intolerant, it is important to focus on maintaining a healthy and balanced diet. You should aim to incorporate a variety of nutrient-dense foods such as whole grains, lean proteins, fruits, and vegetables while limiting your intake of processed and high-fat foods. It is also important to stay hydrated by drinking plenty of water and to maintain a consistent exercise routine. Additionally, reducing your sodium intake can help to lower your blood pressure and improve overall heart health. It may be helpful to consult with a registered dietitian to develop a personalized nutrition plan that meets your individual needs and goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition indicates that the individual is a moderately active obese Female with diabetes, high cholesterol, and is also following a vegetarian diet while not having lactose intolerance. The absence of high blood pressure suggests that managing the other health conditions is the priority. As a dietitian, I would recommend a balanced meal plan that includes plenty of non-starchy vegetables, whole grains, lean proteins such as legumes, and healthy fats such as avocados and nuts. It is also important to limit the intake of saturated and trans fats, added sugars, and salt. A registered dietitian can create a personalized meal plan to meet the individual's specific nutritional needs while also taking into consideration their personal food preferences and cultural background. Additionally, it is recommended to engage in regular physical activity and to work closely with a healthcare provider to manage diabetes and cholesterol levels.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This code block suggests that the person is a Female with a BMI greater than or equal to 30, is moderately active, and does not have high blood pressure, but has diabetes, high cholesterol, is a vegetarian and is lactose intolerant. Based on this information, I would advise this individual to eat a well-balanced diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should focus on consuming nutrient-dense foods such as whole grains, fruits, vegetables, legumes, nuts, seeds, and lean sources of protein such as fish, chicken, turkey, and plant-based sources such as tofu and tempeh. They should also choose low-fat dairy alternatives or non-dairy sources of calcium and vitamin D if they are lactose intolerant. It is also important for them to manage their diabetes by monitoring their blood sugar levels regularly, taking medication as prescribed by their healthcare provider, and engaging in regular physical activity. A registered dietitian can provide personalized and specific nutrition recommendations to meet their individual needs and goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition represents a Female individual with moderate activity level, having a BMI greater than or equal to 30, without high blood pressure, with diabetes and high cholesterol, being vegetarian but not lactose intolerant.

Based on these criteria, I would recommend a balanced diet that is high in fiber, plant-based protein, and healthy fats. Since the individual is vegetarian, they should consume a variety of protein sources such as beans, lentils, tofu, and tempeh. They should also include plenty of vegetables, fruits, whole grains, and nuts in their diet.

To manage their diabetes and high cholesterol, they should limit their intake of processed foods, added sugars, and saturated fats. Instead, they should focus on healthy fats found in foods like avocados, nuts, and seeds. They should also monitor their blood glucose levels regularly and take any prescribed medication as directed by their healthcare provider.

It's also important to note that since the individual is not lactose intolerant, they could consider incorporating low-fat dairy products into their diet for additional calcium and vitamin D. However, if they choose to avoid dairy, they can get these nutrients from non-dairy sources such as fortified plant milks, leafy greens, and fortified cereals. It's essential to work with a registered dietitian to ensure that their nutritional needs are being met.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `Based on the information provided, it appears that this individual is a moderately active Female with obesity, high blood pressure, and a history of diabetes and high cholesterol. They also have dietary restrictions related to being a non-vegetarian and non-lactose intolerant individual. If this is the case, I would recommend that this individual follows a well-balanced, calorie-controlled diet that is low in saturated fat and high in fiber. They should aim to eat a variety of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may also be beneficial for this individual to work with a registered dietitian to help them develop a personalized nutrition plan that meets their specific needs and goals. Additionally, they should prioritize regular physical activity and speak with their healthcare provider about any necessary medical interventions to manage their blood pressure, diabetes, and high cholesterol.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition represents a Female with moderate activity level, who is obese with a BMI greater than or equal to 30, has normal blood pressure but has been diagnosed with diabetes and is a vegetarian who can consume lactose. However, they do not have high cholesterol levels.

As an expert dietitian, I would recommend a well-balanced and nutrient-dense diet that is tailored to manage diabetes and support weight loss. This individual should aim to include a variety of colorful vegetables, fruits, whole grains, lean protein sources, and healthy fats in their meals. As a vegetarian, they should ensure they are getting enough protein from plant-based sources like legumes, tofu, tempeh, and nuts, and supplement their diet with vitamin B12 and iron. Additionally, it's important to monitor portion sizes and limit added sugars, refined carbohydrates, and saturated and trans fats. Regular physical activity, adequate hydration, and stress management techniques can also be helpful for managing diabetes and maintaining a healthy weight.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the given conditions, the individual is a moderately active, obese Female who has diabetes, normal blood pressure, and does not consume animal products or lactose. It is important for this individual to focus on a diet that is low in added sugars and refined carbohydrates to help manage blood sugar levels. They should consume a variety of plant-based foods, including whole grains, fruits, vegetables, and legumes to provide essential nutrients and fiber. Additionally, they may benefit from incorporating healthy fats, such as nuts, seeds, and avocados into their diet to help promote satiety and manage cholesterol levels. It is important for this individual to work with a registered dietitian to create a personalized nutrition plan that meets their individual needs and preferences.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This individual has diabetes and lactose intolerance, but no high blood pressure or high cholesterol. It's important for them to monitor their blood sugar levels closely and maintain a balanced diet with appropriate carbohydrate and protein intake. Lactose-free dairy products and alternative sources of calcium should be incorporated to ensure adequate nutrient intake. Vegetables, whole grains, lean protein, and healthy fats should be prioritized, while limiting added sugars and processed foods. Regular physical activity, along with a balanced diet, is also important for managing diabetes and maintaining overall health.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `I would recommend this individual to focus on a balanced and heart-healthy diet to manage their high cholesterol levels. This could include reducing saturated and trans fats, increasing fiber-rich whole grains, fruits, vegetables, and lean protein sources such as fish and poultry, and limiting processed and high-sugar foods. Additionally, regular physical activity can help manage weight and improve cholesterol levels. It is also important for this individual to regularly monitor their cholesterol levels and work with a healthcare provider to determine the best approach for managing their cholesterol.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `If you are a Female with a moderate activity level and a BMI over 30 who does not have high blood pressure, is not diabetic, is not lactose intolerant, and follows a vegetarian diet but has high cholesterol, it's important to make some dietary changes. You should aim to consume a diet low in saturated and trans fats and high in fiber, such as fruits, vegetables, whole grains, legumes, and lean protein sources like fish or skinless chicken. It's also important to limit your intake of processed foods, sugary drinks, and alcohol, which can contribute to high cholesterol levels. Consulting a registered dietitian can help you create a personalized diet plan that fits your nutritional needs and health goals.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `Based on the information provided, if a Female has a moderate activity level, a BMI of 30 or more, does not have high blood pressure or diabetes, but has high cholesterol and is lactose intolerant, the dietitian's advice would be to limit saturated and trans fats in the diet, and to focus on consuming more whole, plant-based foods. Good choices include fruits, vegetables, whole grains, legumes, nuts, and seeds. Low-fat dairy alternatives, such as almond or soy milk, can be included in the diet to provide calcium and other important nutrients. It may also be helpful to work with a registered dietitian to develop a personalized nutrition plan.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given information, it seems like the person is a Female with a moderate active lifestyle and an obese body mass index. They do not have high blood pressure or diabetes, and their cholesterol level is low. They are non-vegetarian but may have lactose intolerance.

My advice would be to focus on a balanced diet that is rich in nutrients while being mindful of their lactose intolerance. They should aim to consume a variety of fruits, vegetables, whole grains, and lean protein sources like poultry, fish, and legumes. It is also important for them to limit their intake of saturated and trans fats, added sugars, and processed foods. They may benefit from working with a registered dietitian to develop a personalized nutrition plan to meet their specific needs and goals. Additionally, incorporating regular physical activity into their routine can also help improve their overall health and wellbeing.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `a moderately active Female individual with a BMI greater than or equal to 30, who does not have high blood pressure, diabetes or high cholesterol, is vegetarian and lactose intolerant. Based on this, as a dietitian, I would recommend a diet that is high in plant-based proteins such as legumes, tofu, and tempeh to ensure adequate protein intake. Foods rich in calcium such as fortified plant milks, dark leafy greens, and calcium-set tofu should be included to support bone health. Lactose-free dairy alternatives such as soy milk, almond milk, or oat milk can be used to meet calcium and vitamin D needs. It is important to focus on whole grains, fruits, vegetables, and healthy fats such as nuts, seeds, and avocado to ensure balanced nutrition. A consultation with a registered dietitian can be helpful in developing an individualized meal plan to meet specific nutrient needs.`;
}
else if (gender === "Female" && activity === "moderate" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given information, if the individual is a moderately active Female with a BMI over 30 and has no history of blood pressure or diabetes, but has high cholesterol and is lactose intolerant, then it is recommended to consume a low-fat diet with no dairy products. It is essential to focus on plant-based protein sources, such as beans, lentils, and soy products, along with whole grains, fruits, and vegetables. Additionally, reducing the intake of saturated and trans fats, processed foods, and sugary drinks is crucial for maintaining a healthy weight and reducing the risk of heart disease. Consulting a registered dietitian to develop a personalized nutrition plan is highly recommended.`;
}
///END FEMALE OB MODERATE RULESS///

///START FEMALE OB VERY RULESS///
if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes") 
{
	advice = `my advice for a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, high cholesterol, is a vegetarian, and has lactose intolerance is to follow a balanced and nutritious diet that helps manage their health conditions. This can include consuming high-fiber foods, lean protein sources, healthy fats, and low-glycemic index carbohydrates while limiting saturated and trans fats, added sugars, and sodium. Additionally, incorporating regular physical activity and working with a healthcare provider to manage their health conditions can help improve their overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is a vegetarian but has lactose intolerance, my advice as a dietitian would be to consume a well-planned plant-based diet that meets all the essential nutrient requirements, including calcium, vitamin D, and vitamin B12, which may be lacking in a lactose-free diet. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. Additionally, it is crucial to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, is not a vegetarian, but has lactose intolerance, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also essential to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity, along with working with a healthcare provider to manage these health conditions, can also be beneficial.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, diabetes, and high cholesterol, and is not a vegetarian and also has lactose intolerance, my advice as a dietitian would be to consume a balanced and varied diet that includes lean protein sources, healthy fats, low-glycemic index carbohydrates, and plenty of fruits and vegetables while avoiding or limiting lactose-containing foods and beverages. Good sources of calcium and vitamin D, which may be lacking in a lactose-free diet, include fortified plant-based milks, dark leafy greens, almonds, and salmon. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions can help improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes and is a vegetarian with lactose intolerance, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Some non-dairy sources of calcium and vitamin D include fortified plant-based milks, tofu, almonds, and leafy greens, while vitamin B12 can be obtained from fortified cereals, plant-based milks, and supplements. It is also essential to monitor blood sugar levels regularly, incorporate regular physical activity, and work with a healthcare provider to manage these health conditions effectively.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is a vegetarian, and has lactose intolerance, but does not have high cholesterol, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Additionally, monitoring blood sugar levels regularly, incorporating regular physical activity, and working with a healthcare provider to manage these health conditions effectively can improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and diabetes, is not a vegetarian but has lactose intolerance and does not have high cholesterol, my advice as a dietitian would be to limit or avoid lactose-containing foods and beverages, such as milk, cheese, and yogurt, and choose lactose-free or low-lactose alternatives, such as lactose-free milk or plant-based milks, lactose-free cheese, and lactose-free yogurt. It is also important to consume a balanced diet that includes a variety of nutrient-dense foods, including lean protein sources, healthy fats, whole grains, and plenty of fruits and vegetables. Regular physical activity and working with a healthcare provider to manage these health conditions effectively can also be beneficial for overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "No")`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is also important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is a vegetarian, and has lactose intolerance, but does not have diabetes, my advice as a dietitian would be to consume a well-planned vegetarian diet that is high in fiber, low in saturated and trans fats, and includes plant-based sources of protein such as legumes, nuts, and seeds. Since this person has high cholesterol, they should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose plant-based sources of omega-3 fatty acids, such as flaxseeds, chia seeds, and walnuts, which can help improve cholesterol levels. Additionally, since this person has lactose intolerance, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian, and has lactose intolerance but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources, such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person has high cholesterol, they should limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods. It is important to choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure and high cholesterol, is not a vegetarian and also lactose intolerant but does not have diabetes, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes lean protein sources such as skinless poultry, fish, and plant-based sources like legumes, nuts, and seeds. Since this person is lactose intolerant, they should choose lactose-free or low-lactose dairy alternatives or plant-based milks that are fortified with calcium and vitamin D to ensure adequate intake of these nutrients. This person should also limit or avoid foods that are high in saturated and trans fats, such as fatty meats, full-fat dairy products, and fried foods, as these can increase cholesterol levels. Regular physical activity and working with a healthcare provider to manage blood pressure and cholesterol levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, and not lactose intolerant but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a balanced diet that is low in saturated and trans fats, high in fiber, and includes a variety of plant-based protein sources like legumes, nuts, and seeds. This person should also ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which are often found in animal products but can be obtained through fortified plant-based sources or supplements. Additionally, since this person has high blood pressure, they should limit their intake of sodium and include plenty of fruits and vegetables in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `For a Female with very activity level who is obese (BMI >= 30) and has high blood pressure, is a vegetarian, not lactose intolerant, but does not have diabetes and high cholesterol, my advice as a dietitian would be to consume a well-balanced diet that is rich in a variety of whole plant-based foods. This person should aim for a variety of nutrient-dense foods such as vegetables, fruits, whole grains, legumes, nuts, and seeds. They should make sure to include plant-based protein sources such as tofu, tempeh, and seitan. Additionally, they should ensure they are getting enough essential nutrients like iron, zinc, and vitamin B12, which can be obtained through fortified plant-based sources or supplements. This person should limit their intake of added sugars, saturated and trans fats, and processed foods. Since this person has high blood pressure, they should also limit their intake of sodium and include plenty of potassium-rich foods such as bananas, avocados, and leafy greens in their diet, which can help lower blood pressure. Regular physical activity, stress management techniques, and working with a healthcare provider to monitor blood pressure levels effectively can also improve overall health and well-being.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `I would recommend that the individual work with a registered dietitian to develop a personalized meal plan that takes into account their lactose intolerance and dietary preferences. It may also be important to limit sodium intake in order to manage their blood pressure. Some options to consider include incorporating more plant-based protein sources, such as beans and lentils, and incorporating calcium-rich non-dairy alternatives, such as fortified almond milk or soy milk, to ensure they are meeting their nutrient needs. It is important for this individual to prioritize regular physical activity and work with their healthcare provider to manage their blood pressure and overall health.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "Yes" && diabetes === "No" && ch === "No" && vege === "No" && lact === "No")
{
	advice = `If you are a Female with a very activity level and a BMI of 30 or greater, and you have high blood pressure and do not have diabetes or high cholesterol, and you are not a vegetarian or lactose intolerant, it is important to focus on maintaining a healthy and balanced diet. You should aim to incorporate a variety of nutrient-dense foods such as whole grains, lean proteins, fruits, and vegetables while limiting your intake of processed and high-fat foods. It is also important to stay hydrated by drinking plenty of water and to maintain a consistent exercise routine. Additionally, reducing your sodium intake can help to lower your blood pressure and improve overall heart health. It may be helpful to consult with a registered dietitian to develop a personalized nutrition plan that meets your individual needs and goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition indicates that the individual is a veryly active obese Female with diabetes, high cholesterol, and is also following a vegetarian diet while not having lactose intolerance. The absence of high blood pressure suggests that managing the other health conditions is the priority. As a dietitian, I would recommend a balanced meal plan that includes plenty of non-starchy vegetables, whole grains, lean proteins such as legumes, and healthy fats such as avocados and nuts. It is also important to limit the intake of saturated and trans fats, added sugars, and salt. A registered dietitian can create a personalized meal plan to meet the individual's specific nutritional needs while also taking into consideration their personal food preferences and cultural background. Additionally, it is recommended to engage in regular physical activity and to work closely with a healthcare provider to manage diabetes and cholesterol levels.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `This code block suggests that the person is a Female with a BMI greater than or equal to 30, is veryly active, and does not have high blood pressure, but has diabetes, high cholesterol, is a vegetarian and is lactose intolerant. Based on this information, I would advise this individual to eat a well-balanced diet that is low in saturated and trans fats, high in fiber, and low in added sugars. They should focus on consuming nutrient-dense foods such as whole grains, fruits, vegetables, legumes, nuts, seeds, and lean sources of protein such as fish, chicken, turkey, and plant-based sources such as tofu and tempeh. They should also choose low-fat dairy alternatives or non-dairy sources of calcium and vitamin D if they are lactose intolerant. It is also important for them to manage their diabetes by monitoring their blood sugar levels regularly, taking medication as prescribed by their healthcare provider, and engaging in regular physical activity. A registered dietitian can provide personalized and specific nutrition recommendations to meet their individual needs and goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `This condition represents a Female individual with very activity level, having a BMI greater than or equal to 30, without high blood pressure, with diabetes and high cholesterol, being vegetarian but not lactose intolerant.

Based on these criteria, I would recommend a balanced diet that is high in fiber, plant-based protein, and healthy fats. Since the individual is vegetarian, they should consume a variety of protein sources such as beans, lentils, tofu, and tempeh. They should also include plenty of vegetables, fruits, whole grains, and nuts in their diet.

To manage their diabetes and high cholesterol, they should limit their intake of processed foods, added sugars, and saturated fats. Instead, they should focus on healthy fats found in foods like avocados, nuts, and seeds. They should also monitor their blood glucose levels regularly and take any prescribed medication as directed by their healthcare provider.

It's also important to note that since the individual is not lactose intolerant, they could consider incorporating low-fat dairy products into their diet for additional calcium and vitamin D. However, if they choose to avoid dairy, they can get these nutrients from non-dairy sources such as fortified plant milks, leafy greens, and fortified cereals. It's essential to work with a registered dietitian to ensure that their nutritional needs are being met.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "Yes" && vege === "No" && lact === "No")
{
	advice = `Based on the information provided, it appears that this individual is a veryly active Female with obesity, high blood pressure, and a history of diabetes and high cholesterol. They also have dietary restrictions related to being a non-vegetarian and non-lactose intolerant individual. If this is the case, I would recommend that this individual follows a well-balanced, calorie-controlled diet that is low in saturated fat and high in fiber. They should aim to eat a variety of fruits, vegetables, whole grains, lean protein sources, and healthy fats. It may also be beneficial for this individual to work with a registered dietitian to help them develop a personalized nutrition plan that meets their specific needs and goals. Additionally, they should prioritize regular physical activity and speak with their healthcare provider about any necessary medical interventions to manage their blood pressure, diabetes, and high cholesterol.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `This condition represents a Female with very activity level, who is obese with a BMI greater than or equal to 30, has normal blood pressure but has been diagnosed with diabetes and is a vegetarian who can consume lactose. However, they do not have high cholesterol levels.

As an expert dietitian, I would recommend a well-balanced and nutrient-dense diet that is tailored to manage diabetes and support weight loss. This individual should aim to include a variety of colorful vegetables, fruits, whole grains, lean protein sources, and healthy fats in their meals. As a vegetarian, they should ensure they are getting enough protein from plant-based sources like legumes, tofu, tempeh, and nuts, and supplement their diet with vitamin B12 and iron. Additionally, it's important to monitor portion sizes and limit added sugars, refined carbohydrates, and saturated and trans fats. Regular physical activity, adequate hydration, and stress management techniques can also be helpful for managing diabetes and maintaining a healthy weight.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `Based on the given conditions, the individual is a veryly active, obese Female who has diabetes, normal blood pressure, and does not consume animal products or lactose. It is important for this individual to focus on a diet that is low in added sugars and refined carbohydrates to help manage blood sugar levels. They should consume a variety of plant-based foods, including whole grains, fruits, vegetables, and legumes to provide essential nutrients and fiber. Additionally, they may benefit from incorporating healthy fats, such as nuts, seeds, and avocados into their diet to help promote satiety and manage cholesterol levels. It is important for this individual to work with a registered dietitian to create a personalized nutrition plan that meets their individual needs and preferences.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "Yes" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `This individual has diabetes and lactose intolerance, but no high blood pressure or high cholesterol. It's important for them to monitor their blood sugar levels closely and maintain a balanced diet with appropriate carbohydrate and protein intake. Lactose-free dairy products and alternative sources of calcium should be incorporated to ensure adequate nutrient intake. Vegetables, whole grains, lean protein, and healthy fats should be prioritized, while limiting added sugars and processed foods. Regular physical activity, along with a balanced diet, is also important for managing diabetes and maintaining overall health.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "Yes")
{
	advice = `I would recommend this individual to focus on a balanced and heart-healthy diet to manage their high cholesterol levels. This could include reducing saturated and trans fats, increasing fiber-rich whole grains, fruits, vegetables, and lean protein sources such as fish and poultry, and limiting processed and high-sugar foods. Additionally, regular physical activity can help manage weight and improve cholesterol levels. It is also important for this individual to regularly monitor their cholesterol levels and work with a healthcare provider to determine the best approach for managing their cholesterol.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "Yes" && lact === "No")
{
	advice = `If you are a Female with a very activity level and a BMI over 30 who does not have high blood pressure, is not diabetic, is not lactose intolerant, and follows a vegetarian diet but has high cholesterol, it's important to make some dietary changes. You should aim to consume a diet low in saturated and trans fats and high in fiber, such as fruits, vegetables, whole grains, legumes, and lean protein sources like fish or skinless chicken. It's also important to limit your intake of processed foods, sugary drinks, and alcohol, which can contribute to high cholesterol levels. Consulting a registered dietitian can help you create a personalized diet plan that fits your nutritional needs and health goals.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "Yes" && vege === "No" && lact === "Yes")
{
	advice = `Based on the information provided, if a Female has a very activity level, a BMI of 30 or more, does not have high blood pressure or diabetes, but has high cholesterol and is lactose intolerant, the dietitian's advice would be to limit saturated and trans fats in the diet, and to focus on consuming more whole, plant-based foods. Good choices include fruits, vegetables, whole grains, legumes, nuts, and seeds. Low-fat dairy alternatives, such as almond or soy milk, can be included in the diet to provide calcium and other important nutrients. It may also be helpful to work with a registered dietitian to develop a personalized nutrition plan.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "Yes")
{
	advice = `Based on the given information, it seems like the person is a Female with a very active lifestyle and an obese body mass index. They do not have high blood pressure or diabetes, and their cholesterol level is low. They are non-vegetarian but may have lactose intolerance.

My advice would be to focus on a balanced diet that is rich in nutrients while being mindful of their lactose intolerance. They should aim to consume a variety of fruits, vegetables, whole grains, and lean protein sources like poultry, fish, and legumes. It is also important for them to limit their intake of saturated and trans fats, added sugars, and processed foods. They may benefit from working with a registered dietitian to develop a personalized nutrition plan to meet their specific needs and goals. Additionally, incorporating regular physical activity into their routine can also help improve their overall health and wellbeing.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "Yes" && lact === "No")
{
	advice = `a veryly active Female individual with a BMI greater than or equal to 30, who does not have high blood pressure, diabetes or high cholesterol, is vegetarian and lactose intolerant. Based on this, as a dietitian, I would recommend a diet that is high in plant-based proteins such as legumes, tofu, and tempeh to ensure adequate protein intake. Foods rich in calcium such as fortified plant milks, dark leafy greens, and calcium-set tofu should be included to support bone health. Lactose-free dairy alternatives such as soy milk, almond milk, or oat milk can be used to meet calcium and vitamin D needs. It is important to focus on whole grains, fruits, vegetables, and healthy fats such as nuts, seeds, and avocado to ensure balanced nutrition. A consultation with a registered dietitian can be helpful in developing an individualized meal plan to meet specific nutrient needs.`;
}
else if (gender === "Female" && activity === "very" && (bmi >= 30) && bloodpressure === "No" && diabetes === "No" && ch === "No" && vege === "No" && lact === "Yes")
{
	advice = `Based on the given information, if the individual is a veryly active Female with a BMI over 30 and has no history of blood pressure or diabetes, but has high cholesterol and is lactose intolerant, then it is recommended to consume a low-fat diet with no dairy products. It is essential to focus on plant-based protein sources, such as beans, lentils, and soy products, along with whole grains, fruits, and vegetables. Additionally, reducing the intake of saturated and trans fats, processed foods, and sugary drinks is crucial for maintaining a healthy weight and reducing the risk of heart disease. Consulting a registered dietitian to develop a personalized nutrition plan is highly recommended.`;
}
///END FEMALE OB VERY RULESS///


document.getElementById("adv").innerHTML = advice;

////DESCLORE - DIETARY ADVICE////
    
  ///DESCALORE - PRINT////
  document.getElementById("username").innerHTML = name;
  document.getElementById("usergender").innerHTML = gender;
  document.getElementById("userheight").innerHTML = height;
  document.getElementById("userweight").innerHTML = weight;
  document.querySelector("#userbmi").innerHTML = `${bmi.toFixed(2)}`;
  document.getElementById("userstatus").innerHTML = statBMI;
  document.querySelector("#userbmr").innerHTML = `${bmr.toFixed(2)} calories.`;
  document.querySelector("#userbmra").innerHTML = `${bmra.toFixed(2)} calories.`;

  document.querySelector("#bmrminb").innerHTML = `${bmrminb.toFixed(2)}`;
  document.querySelector("#bmrmaxb").innerHTML = `${bmrmaxb.toFixed(2)}`;
  document.querySelector("#bmrminms").innerHTML = `${bmrminms.toFixed(2)}`;
  document.querySelector("#bmrmaxms").innerHTML = `${bmrmaxms.toFixed(2)}`;
  document.querySelector("#bmrminl").innerHTML = `${bmrminl.toFixed(2)}`;
  document.querySelector("#bmrmaxl").innerHTML = `${bmrmaxl.toFixed(2)}`;
  document.querySelector("#bmrmintt").innerHTML = `${bmrmintt.toFixed(2)}`;
  document.querySelector("#bmrmaxtt").innerHTML = `${bmrmaxtt.toFixed(2)}`;
  document.querySelector("#bmrmind").innerHTML = `${bmrmind.toFixed(2)}`;
  document.querySelector("#bmrmaxd").innerHTML = `${bmrmaxd.toFixed(2)}`;

  document.querySelector("#bmraminb").innerHTML = `${bmraminb.toFixed(2)}`;
  document.querySelector("#bmramaxb").innerHTML = `${bmramaxb.toFixed(2)}`;
  document.querySelector("#bmraminms").innerHTML = `${bmraminms.toFixed(2)}`;
  document.querySelector("#bmramaxms").innerHTML = `${bmramaxms.toFixed(2)}`;
  document.querySelector("#bmraminl").innerHTML = `${bmraminl.toFixed(2)}`;
  document.querySelector("#bmramaxl").innerHTML = `${bmramaxl.toFixed(2)}`;
  document.querySelector("#bmramintt").innerHTML = `${bmramintt.toFixed(2)}`;
  document.querySelector("#bmramaxtt").innerHTML = `${bmramaxtt.toFixed(2)}`;
  document.querySelector("#bmramind").innerHTML = `${bmramind.toFixed(2)}`;
  document.querySelector("#bmramaxd").innerHTML = `${bmramaxd.toFixed(2)}`;


  document.querySelector("#tbmrb").innerHTML = `${tbmrb.toFixed(2)}`;
  document.querySelector("#tbmrms").innerHTML = `${tbmrms.toFixed(2)}`;
  document.querySelector("#tbmrl").innerHTML = `${tbmrl.toFixed(2)}`;
  document.querySelector("#tbmrtt").innerHTML = `${tbmrtt.toFixed(2)}`;
  document.querySelector("#tbmrd").innerHTML = `${tbmrd.toFixed(2)}`;

  document.querySelector("#tbmrab").innerHTML = `${tbmrab.toFixed(2)}`;
  document.querySelector("#tbmrams").innerHTML = `${tbmrams.toFixed(2)}`;
  document.querySelector("#tbmral").innerHTML = `${tbmral.toFixed(2)}`;
  document.querySelector("#tbmratt").innerHTML = `${tbmratt.toFixed(2)}`;
  document.querySelector("#tbmrad").innerHTML = `${tbmrad.toFixed(2)}`;
  ///DESCALORE - PRINT////
  
}

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

// Script to open and close sidebar
function w3_open() {
document.getElementById("mySidebar").style.display = "block";
document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
document.getElementById("mySidebar").style.display = "none";
document.getElementById("myOverlay").style.display = "none";
}

$(document).ready(function(){
 $(window).scroll(function(){
     // sticky navbar on scroll script
     if(this.scrollY > 20){
         $('.navbar').addClass("sticky");
     }else{
         $('.navbar').removeClass("sticky");
     }
     
     // scroll-up button show/hide script
     if(this.scrollY > 500){
         $('.scroll-up-btn').addClass("show");
     }else{
         $('.scroll-up-btn').removeClass("show");
     }
 });

 // slide-up script
 $('.scroll-up-btn').click(function(){
     $('html').animate({scrollTop: 0});
     // removing smooth scroll on slide-up button click
     $('html').css("scrollBehavior", "auto");
 });

 $('.navbar .menu li a').click(function(){
     // applying again smooth scroll on menu items click
     $('html').css("scrollBehavior", "smooth");
 });

 // toggle menu/navbar script
 $('.menu-btn').click(function(){
     $('.navbar .menu').toggleClass("active");
     $('.menu-btn i').toggleClass("active");
 });



 var typed = new Typed(".typing-2", {
     strings: ["Tasukete!!!",],
     typeSpeed: 100,
     backSpeed: 60,
     loop: true
 });



});

/*function Advice(gender, activity, bmi, bloodpressure, vege, ch, lact)
{
  var gender = calcAll();
  var activity = calcAll();
  var bmi = catBMI(bmi);
  var bloodpressure = calcAll();
  var vege = calcAll();
  var ch = calcAll();
  var lact = calcAll();
  
  if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && vege === "Yes" && ch === "Yes" && lact === "Yes")
  {
    document.getElementById("adv").innerHTML = "As a sedentary male with an overweight BMI, high blood pressure, and lactose intolerance, it is important to take action to improve your health. Being a vegetarian is a healthy lifestyle choice, but it is important to make sure you are getting all of the necessary nutrients. Try incorporating more plant-based sources of protein like beans, lentils, and tofu, and consider taking a daily multivitamin. It is also important to monitor your cholesterol intake and choose heart-healthy fats such as those found in nuts and seeds, avocados, and olive oil. Additionally, focus on increasing your physical activity levels gradually to help improve your overall health and manage your weight.";
  }
  else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "No" && vege === "Yes" && ch === "Yes" && lact === "Yes")
  {
    document.getElementById("adv").innerHTML = "If you are a sedentary male with an overweight BMI, it is important to focus on making lifestyle changes to improve your health. While being a vegetarian can be healthy, it's important to make sure you're getting enough protein and essential nutrients. Since you have high cholesterol, try to limit your intake of saturated and trans fats and instead focus on eating more fiber, fruits, and vegetables. Additionally, since you are lactose intolerant, make sure to find alternative sources of calcium such as fortified plant-based milks or leafy greens. Since you do not have high blood pressure, it's important to maintain a healthy blood pressure by following a healthy diet and engaging in regular physical activity. Try to aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous exercise per week. Incorporating strength training exercises can also help you build muscle and maintain a healthy weight. It's important to monitor your progress and speak with a healthcare professional for additional guidance and support.";
  }  
  else if (gender === "Male" && activity === "sedentary" && (bmi >= 25 && bmi <= 29.9) && bloodpressure === "Yes" && vege === "No" && ch === "Yes" && lact === "Yes")
  {
    document.getElementById("adv").innerHTML = "heh";
  }
  else if (gender === "Male")
  {
    document.getElementById("adv").innerHTML = "heh";
  }
  

}
*/





///Fetch API themealdb///
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Do something with the data
  })
  .catch(error => {
    console.error(error);
  });
///Fetch API themealdb///


