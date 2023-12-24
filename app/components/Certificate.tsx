import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#33799c",
    padding: 40,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    color: "#333",
    textTransform: "uppercase",
    textAlign: "center",
  },
  content: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Helvetica",
    color: "#555",
    lineHeight: 1.5,
    textAlign: "center",
  },
  signature: {
    fontSize: 18,
    fontFamily: "Helvetica-Oblique",
    color: "#777",
    marginTop: 20,
    textAlign: "right",
  },
  section: {
    flexGrow: 1,
    textAlign: "center",
  },
  watermark: {
    position: "absolute",
    opacity: 0.1,
    fontSize: 120,
    transform: "rotate(-45deg)",
    zIndex: -1,
    color: "#ccc",
    top: "40%",
    left: "30%",
  },
});

interface Props {
  recipientName: string;
  courseName: string;
}

const Certificate = ({ recipientName, courseName }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.watermark}>BLearn</Text>
          <Text style={styles.title}>Certificate of Completion</Text>
          <Text style={styles.content}>
            This is to certify that {recipientName} has successfully completed
            the {courseName}.
          </Text>
          <Text style={styles.signature}>BLearn</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
