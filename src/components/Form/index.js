import { useState } from "react";
import {
	TextInput,
	View,
	Text,
	TouchableOpacity,
	Vibration,
    Pressable,
    Keyboard
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeigth] = useState(null);
    const [messageImc, setMessageImc] = useState("preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);


    const imcCalculator = function() {
        let heightFormat = height.replace(",", ".");
		return setImc((weight / (heightFormat * heightFormat)).toFixed(2));
    }

    const verificationImc = function() {
        if (imc == null) {
            Vibration.vibrate();
            setErrorMessage("campo obrigatório *");
        }
    }

    const validationImc = function() {
        if (weight != null && height != null) {
            imcCalculator();
            setHeight(null);
            setWeigth(null);
            setMessageImc("Seu imc é ");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
        } else {
            verificationImc();
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("preencha o peso e altura");
        }
    }

	return (
		<View style={styles.formContext}>
			{imc == null ? (
				<Pressable onPress={Keyboard.dismiss} style={styles.form}>
					<Text style={styles.formLabel}>Altura</Text>
					<Text style={styles.errorMessage}>{errorMessage}</Text>
					<TextInput
						style={styles.input}
						onChangeText={setHeight}
						value={height}
						placeholder="Ex. 1.75"
						keyboardType="numeric"></TextInput>

					<Text style={styles.formLabel}>Peso</Text>
					<Text style={styles.errorMessage}>{errorMessage}</Text>
					<TextInput
						style={styles.input}
						onChangeText={setWeigth}
						value={weight}
						placeholder="Ex. 75.365"
						keyboardType="numeric"></TextInput>
					<TouchableOpacity
						style={styles.buttonCalculator}
						onPress={() => validationImc()}>
						<Text style={styles.textButtonCalculator}>{textButton}</Text>
					</TouchableOpacity>
				</Pressable>
			) : (
				<View style={styles.exhibitionResultImc}>
					<ResultImc resultImc={imc} messageResultImc={messageImc} />
					<TouchableOpacity
						style={styles.buttonCalculator}
						onPress={() => validationImc()}>
						<Text style={styles.textButtonCalculator}>{textButton}</Text>
					</TouchableOpacity>                    
				</View>
			)}
		</View>
	);
}
