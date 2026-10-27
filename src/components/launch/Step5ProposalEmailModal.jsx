import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  X,
  Eye,
  Pencil,
  RotateCcw,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import FormattedMarkdownBody from "./FormattedMarkdownBody";

/**
 * Step5ProposalEmailModal
 *
 * Provides a 1-on-1 personal email preview and copy editor for Section 1 Step 5.
 * Guarantees human-to-human email format (not a newsletter blast) with:
 * 1. Embedded concept preview images
 * 2. Highlighted note emphasizing research based on creator's channel and comments
 * 3. Highlighted note guaranteeing 100% creative flexibility or building their own ideas
 * 4. High deliverability layout to avoid promotional and spam tabs
 */
export default function Step5ProposalEmailModal({
  isOpen = false,
  creator = null,
  emailData = null,
  customSubject = "",
  customBody = "",
  isSending = false,
  onSaveCopy = () => {},
  onResetCopy = () => {},
  onSendAndAdvance = () => {},
  onClose = () => {},
}) {
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "edit"
  const [subjectDraft, setSubjectDraft] = useState("");
  const [bodyDraft, setBodyDraft] = useState("");

  const defaultSubj = emailData?.defaultSubject || (creator?.handle ? `Software concepts tailored for @${creator.handle.replace(/^@/, '')}` : "Software concepts breakdown");
  const defaultBd = emailData?.defaultBody || "";

  useEffect(() => {
    if (isOpen) {
      setSubjectDraft(customSubject || defaultSubj);
      setBodyDraft(customBody || defaultBd);
      setViewMode("preview");
    }
  }, [isOpen, customSubject, customBody, defaultSubj, defaultBd]);

  if (!isOpen || !creator) return null;

  const cleanHandle = (creator.handle || "").replace(/^@/, "").trim();
  const creatorName = creator.name || creator.display_name || creator.handle || "Creator";
  const recipientEmail = (creator.email || creator.email_public || "").trim();
  const activeSubject = subjectDraft || defaultSubj;
  const activeBody = bodyDraft || defaultBd;

  const handleReset = () => {
    setSubjectDraft(defaultSubj);
    setBodyDraft(defaultBd);
    onResetCopy();
  };

  const handleSaveAndSwitchToPreview = () => {
    onSaveCopy(subjectDraft, bodyDraft);
    setViewMode("preview");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 text-sky-600 shadow-2xs">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-sm font-display truncate">
                  Proposal Email: {creatorName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold font-mono">
                  1-on-1 Personal Email (High Deliverability)
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                To: <span className="text-slate-800 font-medium">{recipientEmail || "No email on file"}</span>
                {cleanHandle && <span className="ml-1 text-slate-400">(@{cleanHandle})</span>}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverability & Anti-Spam Banner */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-[11px] text-slate-600">
              Styled as an authentic email from <strong>Alex Rivera</strong> with embedded screenshots and research notes — no promotional blast cards or spam buttons.
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                if (viewMode === "edit") onSaveCopy(subjectDraft, bodyDraft);
                setViewMode("preview");
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === "preview"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                viewMode === "edit"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Copy</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {viewMode === "preview" ? (
            <div className="space-y-3">
              {/* Fake Email Envelope Header */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-1.5 font-sans">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 w-16 text-[11px] uppercase tracking-wider">From:</span>
                  <span className="text-slate-800 font-medium">Alex Rivera &lt;creatorforgeweb@gmail.com&gt;</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 w-16 text-[11px] uppercase tracking-wider">To:</span>
                  <span className="text-slate-800 font-medium">{creatorName} &lt;{recipientEmail || "creator@channel.com"}&gt;</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                  <span className="font-bold text-slate-500 w-16 text-[11px] uppercase tracking-wider">Subject:</span>
                  <span className="text-slate-900 font-bold">{activeSubject}</span>
                </div>
              </div>

              {/* Rendered Email Body Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-slate-900 leading-relaxed">
                <FormattedMarkdownBody text={activeBody} isDark={false} showRefTag={true} />
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Subject Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subject Line</label>
                <input
                  type="text"
                  value={subjectDraft}
                  onChange={(e) => setSubjectDraft(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
                  placeholder="Subject line..."
                />
              </div>

              {/* Body Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Email Body (Markdown supported)</label>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-medium"
                    title="Reset to recommended template"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Template</span>
                  </button>
                </div>
                <textarea
                  rows={14}
                  value={bodyDraft}
                  onChange={(e) => setBodyDraft(e.target.value)}
                  className="w-full p-3.5 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 leading-relaxed resize-y"
                  placeholder="Email body text..."
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Images can be included via <code>![Concept Preview](imageUrl)</code></span>
                  <span>{bodyDraft.length} characters</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {recipientEmail ? (
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ready to dispatch to {recipientEmail}</span>
              </span>
            ) : (
              <span className="text-amber-700 font-medium">
                ⚠️ No recipient email address configured for this creator
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {viewMode === "edit" ? (
              <button
                type="button"
                onClick={handleSaveAndSwitchToPreview}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                Done Editing & Preview
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                Close
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (viewMode === "edit") onSaveCopy(subjectDraft, bodyDraft);
                onSendAndAdvance();
              }}
              disabled={isSending || !recipientEmail}
              className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isSending ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              ) : (
                <Send className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{isSending ? "Dispatching..." : "Send 3 Concepts & Advance to Step 6 →"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
