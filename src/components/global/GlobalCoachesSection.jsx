import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Trophy, Users, Target, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalCoachesSection() {
  const globalMentors = [
    {
      name: "Fawad Ahmed",
      title: "Former Australian International Spinner",
      achievement: "Former Victorian Bushranger",
      image: "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcontent.api.news%2Fv3%2Fimages%2Fbin%2F303027805caafa3e371555a35580ce17",
      specialties: ["Spin Bowling", "Mental Strength", "International Experience"],
      quote: "A former Victorian Bushranger and Australian international spinner, Fawad's journey from a refugee to a professional cricketer is an inspiration. His experience playing cricket at the highest level provides our programs with a deep understanding of spin bowling and professional pathways."
    },
    {
      name: "Peter Bol",
      title: "Olympic Middle-Distance Runner",
      achievement: "Tokyo 2020 Olympian",
      image: "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcontent.olympics.com.au%2Fpublic%2Fstyles%2Fportrait_header_section%2Fs3%2F2025-04%2FBOL.jpg.webp%3Fitok%3DxToNH1w9",
      specialties: ["Mental Conditioning", "Peak Performance", "Resilience Training"],
      quote: "An Olympic middle-distance runner, Peter Bol is a two-time Olympian and a national record holder. . He is a mentor in our program, offering invaluable insights into mental resilience, discipline, and the dedication required to perform at an elite level."
    },
    {
      name: "Bachar Houli",
      title: "AFL Premiership Champion",
      achievement: "Richmond Tigers Legend",
      image: "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fbacharhoulifoundation.com.au%2Fwp-content%2Fuploads%2F2023%2F11%2FOJ190917MK0362-e1566434253150-1200x1190-2-1024x1015.jpg",
      specialties: ["Leadership", "Team Building", "Community Engagement"],
      quote: "An AFL Premiership champion, Bachar is a highly respected figure in Australian sport. He excelled at the highest level of Australian Rules Football and is a leader in community engagement. He mentors our players on professionalism, leadership, and the importance of integrity on and off the field."
    },

    {
      name: "Peter Hatzoglou",
      title: "Right-arm Leg-spin Bowler",
      achievement: "Big Bash League Short-form Specialist",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVSZiMOMOUJQZtNBe_697OsYlgRhNRHhe02q3A8pS1Jxls1mE0Gphx96qKZiiA9Y669Q-VIkSB3_DmyAZwGFmxlw",
      specialties: ["Right-arm Leg-spin Bowling", "googlies", "pressure handling"],
      quote: "A Big Bash League short-form specialist, Peter Hatzoglou is known for his idiosyncratic bowling action, ability to bowl topspinners, sliders and googlies as well as the ability to bowl from a high release point at high pace. He provides our program with specific expertise on the tactics and skills required to succeed in the modern game."
    },
    {
      name: "Mohamed Irfan",
      title: "Former Hockey Australia Captain",
      achievement: "International Hockey Star",
      image: "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fwww.mediastorehouse.com.au%2Fp%2F773%2Fmuhammad-irfan-25108724.jpg.webp",
      specialties: ["Strategy & Tactics", "Captaincy", "International Experience"],
      quote: "Pakistani field hockey defender and captain with international experience, offering mentorship in team dynamics, discipline, and elite sport professionalism."
    },
    
  ];

  return (
    <section id="global-coaches" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400 mb-4 px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Meet Our Coaches and Mentors
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Elite Coaching Panel -
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
               Your Global Mentors
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Cricket Cadets is proud to be supported by a select panel of internationally
            experienced, elite coaches and sporting mentors. This global panel plays an
            essential role in shaping our coaching philosophy, designing program curricula, and
            continuously refining our training methods to ensure all players receive the highest-
            quality cricket education regardless of location. 
          </p>
        </motion.div>

        {/* Global Mentors Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {globalMentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-6">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/30 group-hover:ring-amber-500/50 transition-all duration-300"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-white mb-1">
                        {mentor.name}
                      </CardTitle>
                      <p className="text-amber-400 font-semibold mb-1">{mentor.title}</p>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                        {mentor.achievement}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="relative">
                    <Quote className="w-6 h-6 text-amber-400/30 absolute -top-1 -left-1" />
                    <p className="text-gray-300 italic leading-relaxed pl-6 text-sm">
                      "{mentor.quote}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3 text-sm">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, idx) => (
                        <Badge key={idx} className="bg-gray-700 text-gray-300 hover:bg-gray-600 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-900/50 to-amber-900/50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Local Qualified Coaches: Your Everyday Cricket Mentors
          </h3>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Our programs are delivered on the ground by carefully selected, fully accredited
            coaches in every region. These professionals share our values of inclusion, player
            safety, and continuous improvement, bringing the foundation laid by our elite panel to
            life through daily coaching and mentoring.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-amber-900" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Certified Coaches</h4>
              <p className="text-gray-300 text-sm">All coaches hold national certifications in their respective countries</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Local Expertise</h4>
              <p className="text-gray-300 text-sm">Understanding of regional cricket pathways and development systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Continuous Development</h4>
              <p className="text-gray-300 text-sm">Regular training and upskilling to maintain coaching excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}