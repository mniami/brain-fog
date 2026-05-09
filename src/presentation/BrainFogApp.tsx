import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { formatRemainingTime, type TaskThread } from '../domain/task';
import { useBrainFogApp } from '../application/useBrainFogApp';

function ThreadCard({
  task,
  now,
  onComplete,
  onSnooze,
}: {
  task: TaskThread;
  now: number;
  onComplete: (taskId: string) => void;
  onSnooze: (taskId: string) => void;
}) {
  const due = task.status === 'due';

  return (
    <View style={[styles.card, due ? styles.cardDue : undefined]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <Text style={[styles.cardTimer, due ? styles.cardTimerDue : undefined]}>
          {due ? 'Przypomnienie' : formatRemainingTime(task, now)}
        </Text>
      </View>

      <Text style={styles.cardMeta}>
        {due
          ? 'Wątek wymaga teraz uwagi.'
          : `Pozostało ${formatRemainingTime(task, now)} do przypomnienia.`}
      </Text>

      <View style={styles.cardActions}>
        {due ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => onSnooze(task.id)}
            style={[styles.actionButton, styles.secondaryActionButton]}
          >
            <Text style={styles.secondaryActionText}>Snooze +3 min</Text>
          </Pressable>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={() => onComplete(task.id)}
          style={[styles.actionButton, styles.primaryActionButton]}
        >
          <Text style={styles.primaryActionText}>Oznacz jako zrobione</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function BrainFogApp() {
  const {
    draft,
    setDraft,
    selectedDurationSeconds,
    setSelectedDurationSeconds,
    timerPresets,
    activeTasks,
    completedTasks,
    addTask,
    completeTask,
    snoozeTask,
    now,
  } = useBrainFogApp();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Brain-Fog</Text>
          <Text style={styles.title}>Zewnętrzna pamięć robocza na najbliższe minuty</Text>
          <Text style={styles.subtitle}>
            Pierwszy pion implementacji MVP: szybkie dodanie zadania, mikro-timer i dashboard
            aktywnych wątków.
          </Text>
        </View>

        <View style={styles.capturePanel}>
          <Text style={styles.sectionTitle}>Szybkie dodanie wątku</Text>
          <TextInput
            accessibilityLabel="Treść zadania"
            onChangeText={setDraft}
            placeholder="Np. Oddzwonić po wyjściu z parkingu"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={draft}
          />

          <View style={styles.presetRow}>
            {timerPresets.map((preset) => {
              const selected = preset.seconds === selectedDurationSeconds;

              return (
                <Pressable
                  key={preset.seconds}
                  accessibilityRole="button"
                  onPress={() => setSelectedDurationSeconds(preset.seconds)}
                  style={[styles.presetButton, selected ? styles.presetButtonSelected : undefined]}
                >
                  <Text
                    style={[
                      styles.presetButtonText,
                      selected ? styles.presetButtonTextSelected : undefined,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable accessibilityRole="button" onPress={addTask} style={styles.captureButton}>
            <Text style={styles.captureButtonText}>Dodaj aktywny wątek</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aktywne wątki</Text>
            <Text style={styles.sectionCounter}>{activeTasks.length}</Text>
          </View>

          {activeTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>Brak aktywnych zadań</Text>
              <Text style={styles.emptyStateBody}>
                Dodaj krótki wątek i przypomnienie, aby utrzymać kontekst na głównym ekranie.
              </Text>
            </View>
          ) : (
            activeTasks.map((task) => (
              <ThreadCard
                key={task.id}
                now={now}
                onComplete={completeTask}
                onSnooze={snoozeTask}
                task={task}
              />
            ))
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ostatnio zamknięte</Text>
            <Text style={styles.sectionCounter}>{completedTasks.length}</Text>
          </View>

          {completedTasks.length === 0 ? (
            <Text style={styles.completedHint}>
              Ukończone zadania będą pojawiać się tutaj, bez ukrywania aktywnych wątków.
            </Text>
          ) : (
            completedTasks.map((task) => (
              <View key={task.id} style={styles.completedCard}>
                <Text style={styles.completedCardTitle}>{task.title}</Text>
                <Text style={styles.completedCardMeta}>
                  Timer ustawiony na {Math.round(task.durationSeconds / 60) || 1} min.
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 24,
  },
  hero: {
    gap: 12,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  capturePanel: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
    padding: 20,
  },
  input: {
    backgroundColor: '#020617',
    borderColor: '#334155',
    borderRadius: 16,
    borderWidth: 1,
    color: '#f8fafc',
    fontSize: 16,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 12,
  },
  presetButton: {
    backgroundColor: '#0b1220',
    borderColor: '#334155',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  presetButtonSelected: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  presetButtonText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
  presetButtonTextSelected: {
    color: '#020617',
  },
  captureButton: {
    alignItems: 'center',
    backgroundColor: '#f97316',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  captureButtonText: {
    color: '#fff7ed',
    fontSize: 16,
    fontWeight: '800',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCounter: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyState: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    padding: 20,
  },
  emptyStateTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyStateBody: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  cardDue: {
    borderColor: '#f97316',
    shadowColor: '#f97316',
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#f8fafc',
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  cardTimer: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '800',
  },
  cardTimerDue: {
    color: '#fdba74',
  },
  cardMeta: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryActionButton: {
    backgroundColor: '#38bdf8',
  },
  secondaryActionButton: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
  },
  primaryActionText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryActionText: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
  },
  completedHint: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
  },
  completedCard: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
    borderRadius: 18,
    borderWidth: 1,
    gap: 4,
    padding: 16,
  },
  completedCardTitle: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '700',
  },
  completedCardMeta: {
    color: '#94a3b8',
    fontSize: 14,
  },
});
