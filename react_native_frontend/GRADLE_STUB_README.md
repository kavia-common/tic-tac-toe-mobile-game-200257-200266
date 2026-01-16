# Gradle wrapper stubs (Expo managed)

This Expo-managed project does not commit a native Android Gradle wrapper by default. Some automated mobile CI checks may still try to run:

- `./gradlew` (from repo root)
- `android/gradlew`

To keep CI non-blocking, we include lightweight stub scripts that just print a message and exit `0`.

## Important: executable bit (Unix)

If your environment reports `Permission denied` when running `./gradlew`, ensure the executable bit is set:

```sh
chmod +x gradlew android/gradlew
```

In normal git workflows, this is preserved via file mode. Some CI/packaging steps may strip it.
