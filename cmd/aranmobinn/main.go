/*
 * Copyright 2026 Aranmobinarann
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `{"status":"ok","project":"aranmobinn"}`)
	})
	mux.HandleFunc("/portfolio", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `{"totalBalanceUsd":178900,"averageYieldApr":9.9,"chains":["TRON","SOLANA","ETHEREUM","BITCOIN","TON"]}`)
	})

	fmt.Println("Aranmobinn Go service running on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		panic(err)
	}
}
