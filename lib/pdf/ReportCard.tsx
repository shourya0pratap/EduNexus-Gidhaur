import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page:{padding:36,fontSize:10,fontFamily:"Helvetica",color:"#102a43"},
  title:{fontSize:18,fontWeight:700,textAlign:"center",marginBottom:4},
  subtitle:{textAlign:"center",fontSize:9,color:"#627d98",marginBottom:20},
  row:{flexDirection:"row",borderBottomWidth:1,borderBottomColor:"#d9e2ec",paddingVertical:7},
  cell:{flex:1}, bold:{fontWeight:700},
  box:{borderWidth:1,borderColor:"#d9e2ec",padding:12,marginBottom:14}
});

export function ReportCardDocument({school,student,exam,subjects,summary}:{school:any;student:any;exam:any;subjects:any[];summary:any}) {
  return <Document><Page size="A4" style={styles.page}>
    <Text style={styles.title}>{school?.school_name ?? "Gidhaur Central School"}</Text>
    <Text style={styles.subtitle}>{school?.address ?? ""}</Text>
    <View style={styles.box}><Text style={styles.bold}>EXAMINATION REPORT CARD</Text><Text>{exam?.name ?? ""}</Text><Text>{student?.full_name} · Roll No. {student?.roll_number}</Text></View>
    <View style={styles.row}>{["Subject","Maximum","Obtained","Percentage","Grade","Status"].map(x=><Text key={x} style={[styles.cell,styles.bold]}>{x}</Text>)}</View>
    {subjects.map((x:any)=><View key={x.subject} style={styles.row}>{[x.subject,x.maximum,x.obtained,x.percentage+"%",x.grade,x.status].map((v:any,i)=><Text key={i} style={styles.cell}>{String(v)}</Text>)}</View>)}
    <View style={{marginTop:18}}><Text style={styles.bold}>Overall</Text><Text>Total: {summary.total} / {summary.maximum}</Text><Text>Percentage: {summary.percentage}% · Grade: {summary.grade} · {summary.status}</Text><Text>Attendance: {summary.attendance ?? "—"}%</Text></View>
    <View style={{marginTop:40,flexDirection:"row",justifyContent:"space-between"}}><Text>Teacher&apos;s Signature</Text><Text>Principal&apos;s Signature</Text></View>
  </Page></Document>
}
