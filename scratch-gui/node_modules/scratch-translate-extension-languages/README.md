# scratch-translate-extension-languages
#### Languages used by the Scratch 3.0 Translate Extension

[![Build Status](https://travis-ci.com/LLK/scratch-translate-extension-languages.svg?token=Yfq2ryN1BwaxDME69Lnc&branch=master)](https://travis-ci.com/LLK/scratch-translate-extension-languages)

## Configuration
| Variable              | Default     | Required | Description                 |
| --------------------- | ----------- | -------- | --------------------------- |
| `GOOGLE_CLIENT_EMAIL` | `null`      | Yes      | Google authentication email |
| `GOOGLE_PRIVATE_KEY`  | `null`      | Yes      | Google authentication key   |

_Note that to properly format `GOOGLE_PRIVATE_KEY` in an environment variable,
newlines should be escaped properly:_

```bash
export GOOGLE_PRIVATE_KEY=$'-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
```
