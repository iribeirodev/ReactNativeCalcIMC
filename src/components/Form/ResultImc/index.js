import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props) {

	const onShare = async () => {
		const result = await Share.share({
			message: "Meu I.M.C hoje é: " + props.resultImc,
		})
	};

	return (
		<>
			<View style={styles.boxShareButton}>
				<TouchableOpacity onPress={onShare} style={styles.shared}>
					<Text style={styles.sharedText}>Compartilhar</Text>
				</TouchableOpacity>
			</View>		
			<View style={styles.contextImc}>
				<Text style={styles.titleResultImc}>{props.messageResultImc}</Text>
				<Text style={styles.resultImc}>{props.resultImc}</Text>
			</View>
		</>
	);
}
