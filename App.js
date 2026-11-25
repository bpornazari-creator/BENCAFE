import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const COLORS = {
  burgundy: "#571B32",
  burgundyLight: "#78334A",
  gold: "#E7C879",
  cream: "#FFFAF5",
  ink: "#35131F",
  muted: "#795C63",
  white: "#FFFFFF",
  line: "#EAD9D0"
};

const SECTIONS = [
  { id: "home", label: "خانه", icon: "⌂" },
  { id: "menu", label: "منو", icon: "☕" },
  { id: "mafia", label: "مافیا", icon: "♟" },
  { id: "orders", label: "سفارش‌ها", icon: "▤" }
];

function ActionCard({ title, description, action, onPress }) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Text style={styles.cardArrow}>←</Text>
      {action ? <Text style={styles.cardAction}>{action}</Text> : null}
    </TouchableOpacity>
  );
}

function Notice({ children }) {
  return (
    <View style={styles.notice}>
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  );
}

export default function App() {
  const [section, setSection] = useState("home");

  const go = (next) => setSection(next);
  const currentTitle = SECTIONS.find((item) => item.id === section)?.label ?? "بن‌کافه";

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.burgundy} />
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>بن‌کافه</Text>
          <Text style={styles.tagline}>کافه‌ای برای دورهمی‌های خوب</Text>
        </View>
        <View style={styles.headerMark}>
          <Text style={styles.headerMarkText}>ب</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {section === "home" ? (
          <>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>به بن‌کافه خوش آمدید</Text>
              <Text style={styles.heroTitle}>طعم خوبِ یک دورهمی</Text>
              <Text style={styles.heroDescription}>
                برای دیدن بخش‌های کافه، منو و دورهمی‌های مافیا از گزینه‌های زیر استفاده کنید.
              </Text>
              <TouchableOpacity style={styles.primaryButton} onPress={() => go("menu")}>
                <Text style={styles.primaryButtonText}>مشاهده منو</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>بخش‌های بن‌کافه</Text>
            <ActionCard
              title="منوی کافه"
              description="نوشیدنی‌ها و خوراکی‌ها"
              onPress={() => go("menu")}
            />
            <ActionCard
              title="بازی مافیا"
              description="اطلاعات دورهمی‌ها و سانس‌ها"
              onPress={() => go("mafia")}
            />
            <ActionCard
              title="سفارش‌ها"
              description="پیگیری سفارش‌ها پس از راه‌اندازی سامانه"
              onPress={() => go("orders")}
            />
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.backButton} onPress={() => go("home")}>
              <Text style={styles.backButtonText}>→ بازگشت به خانه</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>{currentTitle}</Text>
            {section === "menu" ? (
              <>
                <Text style={styles.pageDescription}>منوی بن‌کافه</Text>
                <Notice>
                  اطلاعات واقعی اقلام، قیمت‌ها و موجودی هنوز به پروژه داده نشده است؛ این بخش پس از دریافت منوی کافه تکمیل می‌شود.
                </Notice>
                <View style={styles.infoPanel}>
                  <Text style={styles.infoTitle}>آماده‌سازی منو</Text>
                  <Text style={styles.infoText}>ساختار صفحه آماده است؛ فهرست محصولات و قیمت‌های تأییدشده باید اضافه شوند.</Text>
                </View>
              </>
            ) : null}
            {section === "mafia" ? (
              <>
                <Text style={styles.pageDescription}>دورهمی‌ها و بازی مافیا</Text>
                <Notice>
                  زمان‌بندی سانس‌ها، ظرفیت میزها و قوانین بازی هنوز از طرف کافه ثبت نشده‌اند.
                </Notice>
                <View style={styles.infoPanel}>
                  <Text style={styles.infoTitle}>بخش مافیا</Text>
                  <Text style={styles.infoText}>صفحه اولیه آماده است و می‌تواند به برنامه سانس‌ها و ثبت‌نام متصل شود.</Text>
                </View>
              </>
            ) : null}
            {section === "orders" ? (
              <>
                <Text style={styles.pageDescription}>سفارش‌های شما</Text>
                <Notice>
                  ثبت و پرداخت سفارش هنوز فعال نیست؛ برای فعال‌سازی به منو، روش دریافت سفارش و درگاه پرداخت نیاز داریم.
                </Notice>
                <View style={styles.infoPanel}>
                  <Text style={styles.infoTitle}>سامانه سفارش</Text>
                  <Text style={styles.infoText}>این نسخه سفارش واقعی ارسال نمی‌کند و هیچ پرداختی انجام نمی‌دهد.</Text>
                </View>
              </>
            ) : null}
          </>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        {SECTIONS.map((item) => {
          const active = section === item.id;
          return (
            <TouchableOpacity key={item.id} style={styles.tab} onPress={() => go(item.id)}>
              <Text style={[styles.tabIcon, active && styles.tabActive]}>{item.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.cream },
  header: {
    backgroundColor: COLORS.burgundy,
    paddingHorizontal: 22,
    paddingVertical: 18,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brand: { color: COLORS.gold, fontSize: 27, fontWeight: "800", textAlign: "right" },
  tagline: { color: COLORS.white, fontSize: 12, marginTop: 4, textAlign: "right" },
  headerMark: {
    width: 44, height: 44, borderRadius: 14, borderWidth: 1,
    borderColor: COLORS.gold, alignItems: "center", justifyContent: "center"
  },
  headerMarkText: { color: COLORS.gold, fontSize: 25, fontWeight: "800" },
  content: { padding: 20, paddingBottom: 30 },
  hero: {
    backgroundColor: COLORS.burgundy,
    borderRadius: 22,
    padding: 24,
    marginBottom: 26,
    alignItems: "flex-end"
  },
  eyebrow: { color: COLORS.gold, fontSize: 13, marginBottom: 12, textAlign: "right" },
  heroTitle: { color: COLORS.white, fontSize: 28, lineHeight: 40, fontWeight: "800", textAlign: "right" },
  heroDescription: { color: "#F7EDEB", fontSize: 14, lineHeight: 24, marginTop: 10, textAlign: "right" },
  primaryButton: { backgroundColor: COLORS.gold, borderRadius: 11, paddingVertical: 12, paddingHorizontal: 22, marginTop: 20 },
  primaryButtonText: { color: COLORS.ink, fontWeight: "800", fontSize: 14 },
  sectionTitle: { color: COLORS.ink, fontSize: 19, fontWeight: "800", textAlign: "right", marginBottom: 12 },
  actionCard: {
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.line,
    borderRadius: 16, padding: 17, marginBottom: 12, flexDirection: "row-reverse",
    alignItems: "center", gap: 12
  },
  cardText: { flex: 1 },
  cardTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800", textAlign: "right" },
  cardDescription: { color: COLORS.muted, fontSize: 12, marginTop: 5, textAlign: "right" },
  cardArrow: { color: COLORS.burgundy, fontSize: 22 },
  cardAction: { color: COLORS.muted, fontSize: 11 },
  backButton: { alignSelf: "flex-start", paddingVertical: 8, marginBottom: 14 },
  backButtonText: { color: COLORS.burgundy, fontWeight: "700", fontSize: 13 },
  pageTitle: { color: COLORS.ink, fontSize: 26, fontWeight: "800", textAlign: "right" },
  pageDescription: { color: COLORS.muted, fontSize: 14, textAlign: "right", marginTop: 7, marginBottom: 18 },
  notice: { backgroundColor: "#F4E9E5", borderRadius: 13, padding: 15, borderRightWidth: 4, borderRightColor: COLORS.gold },
  noticeText: { color: COLORS.ink, fontSize: 13, lineHeight: 23, textAlign: "right" },
  infoPanel: { backgroundColor: COLORS.white, borderRadius: 16, borderWidth: 1, borderColor: COLORS.line, padding: 18, marginTop: 16 },
  infoTitle: { color: COLORS.ink, fontSize: 16, fontWeight: "800", textAlign: "right" },
  infoText: { color: COLORS.muted, fontSize: 13, lineHeight: 23, textAlign: "right", marginTop: 8 },
  tabBar: { flexDirection: "row-reverse", backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.line, paddingTop: 9, paddingBottom: 8 },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  tabIcon: { color: COLORS.muted, fontSize: 18 },
  tabLabel: { color: COLORS.muted, fontSize: 11 },
  tabActive: { color: COLORS.burgundy, fontWeight: "800" }
});
